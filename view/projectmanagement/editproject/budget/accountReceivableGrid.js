var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var encode = false;

Ext.define('MyDesktop.view.projectmanagement.editproject.budget.accountReceivableGrid', {
	extend:'Ext.grid.Panel',
	title:'Budget Accounts Receivables',
	alias:'widget.editaccountReceiveGrid',
	closeAction: 'hide',
	width:1100,
	requires:['MyDesktop.store.Receivable'],
	id:'editaccountReceiveGrid',
	plugins: [
              Ext.create('Ext.grid.plugin.CellEditing', {
                  clicksToEdit: 1
             })        
    ],
	initComponent: function() {
		//load receive store
		var receive = Ext.create('MyDesktop.store.Receivable');
		receive.load({
			params: {
				start: 0,
				limit: 50
			}
		});
	
		
		this.store = receive,
	

		this.columns = [
			
				{
					dataIndex: 'budgetReceive_id',
					hidden:true,
				},
		
				 
				{
					text:'Rate / Unit',
					
		columns: [{
					dataIndex: 'rate_USD',
					text: '$',
		        	align:'center',
		        	textStyle:'font-size:13px;',
		        	editor: { 
						xtype:'textfield',
					}
									
				},
				{
					dataIndex: 'rate_GBP',
					text: '£',
		        	align:'center',
		        	editor: { 
						xtype:'textfield',
					}
				}
				]
				},
				{
					dataIndex: 'no_of_unit',
					text: 'No of Units',
					flex: 1,
					align:'center',
					editor: { 
						xtype:'textfield',
						listeners:{ 
						change: function(field, newValue, oldValue){
		                	 var grid = this.up().up();
		                	 var selModel = grid.getSelectionModel();
		                	 var rate=selModel.getSelection()[0].data.rate_USD;
		                	 var rate1=selModel.getSelection()[0].data.rate_GBP;
		                	 var actual=newValue*rate;
		                	 var actual1=newValue*rate1;
		                	 selModel.getSelection()[0].set('budgeted_amount_USD', actual);
		                	 selModel.getSelection()[0].set('budgeted_amount_GBP', actual1);
		                	 selModel.getSelection()[0].set('actual_amount_USD', actual);
		                	 selModel.getSelection()[0].set('actual_amount_GBP', actual1);
		                	 
		                	 var total_USD=0;
					         var total_GBP=0;
					         var myStore = Ext.getCmp('editaccountReceiveGrid').getStore();
					 myStore.each(function(rec) {
					 	total_USD=total_USD+parseInt(rec.get('actual_amount_USD'));
						total_GBP=total_GBP+parseInt(rec.get('actual_amount_GBP'));
					 	});
		                Ext.getCmp('edit_total_receive_USD').setValue(total_USD);
					    Ext.getCmp('edit_total_receive_GBP').setValue(total_GBP);
		                	}
		                }
					}
				},
				{
					text:'Budgeted Amount',
		columns: [
				{
					dataIndex: 'budgeted_amount_USD',
					text: '$',
		        	align:'center',
		        	
					
			    },
			    {
			    	dataIndex: 'budgeted_amount_GBP',
					text: '£',
		        	align:'center',
			    }
			    ]
			    },
		       {
					text:'Actual Amount',
		columns: [
				{
					dataIndex: 'actual_amount_USD',
					text: '$',
		        	align:'center',
		        	
					
			    },
			    {
			    	dataIndex: 'actual_amount_GBP',
					text: '£',
		        	align:'center',
			    }
			    ]
			    },
		
				{
					xtype:'actioncolumn',
					align: 'center',
					flex:1,
					text:'Actions',
					
					items: [
					{
							iconCls: 'deleteClass',
							tooltip: 'Delete',
							handler: function(grid, rowIndex, colIndex) {
								
						
							}
						},
						]
				}    
			
				
		];
		 
			this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			items:[
{
                               xtype : 'button',
                              text : 'Insert New Row',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
                               	 		var project_id=22;
                               	   	 var conn = new Ext.data.Connection();
					 conn.request({
					 url: 'service/budget.php',
					 method: 'POST',
					 params : {action:17,project_id:project_id},
					 success:function(response){
					 obj1 = Ext.JSON.decode(response.responseText);
					 var confirm=obj1.data.confirmed_extent;
					 var cast=obj1.data.castoff_extent;
					 if(confirm.data!=null)
					 {
					var r = Ext.create('MyDesktop.model.Receivable', {
               						budgetReceive_id:'',
               						rate_USD: '',
               						rate_GBP: '',
               						no_of_unit:confirm,
               						amt_USD:'',
               						amt_GBP:''
                				});
                		       receive.insert(receive.getCount(), r);
					 }
					 else
					 {
					 		var r = Ext.create('MyDesktop.model.Receivable', {
               						budgetReceive_id:'',
               						rate_USD: '',
               						rate_GBP: '',
               						no_of_unit:cast,
               						amt_USD:'',
               						amt_GBP:''
                				});
                		       receive.insert(receive.getCount(), r);
					 }
					 }
					 });
               						
            				 }                           
        },
			]
		});
		
		
		this.callParent(arguments);

	}
});