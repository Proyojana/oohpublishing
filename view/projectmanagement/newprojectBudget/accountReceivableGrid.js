var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var encode = false;

Ext.define('MyDesktop.view.projectmanagement.newprojectBudget.accountReceivableGrid', {
	extend:'Ext.grid.Panel',
	title:'Budget Accounts Receivables',
	alias:'widget.accountReceiveGrid',
	closeAction: 'hide',
	width:1050,
	requires:['MyDesktop.store.Receivable'],
	id:'accountReceiveGrid',
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
		this.tbar = Ext.create('Ext.Toolbar', {  
							   items:[{
                               xtype : 'button',
                              // id : 'addnewrowcust',
                               text : 'Insert New Row',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
               						var r = Ext.create('MyDesktop.model.Receivable', {
               						budgetReceive_id:'',
               						rate_USD: '',
               						rate_GBP: '',
               						actual_unit:'',
               						amt_USD:'',
               						amt_GBP:''
                				});
                		       receive.insert(0, r);
            				 }                           
        },
        
        ]
        });

		this.columns = [
		
		{
			dataIndex: 'budgetReceive_id',
			hidden:true,
		},
			 /*  {
					dataIndex: 'edit_cast_off_extent',
					text: 'Cast Off Extent',
					flex: 1,
					align:'center',
					editor: { 
						xtype:'textfield',
					}
				},
				 {
					dataIndex: 'edit_confirmed_extent',
					text: 'Confirmed Extent',
					flex: 1,
					align:'center',
					editor: { 
						xtype:'textfield',
					}
				},
				 {
					dataIndex: 'edit_unit',
					text: 'Unit',
					flex: 1,
					align:'center',
					editor: { 
						xtype:'textfield',
					}
				},*/
				 {
					dataIndex: 'rate_USD',
					text: 'Rate/Unit in $',
					flex: 1,
					align:'center',
					editor: { 
						xtype:'textfield',
					}
				},
				 {
					dataIndex: 'rate_GBP',
					text: 'Rate/Unit in £',
					flex: 1,
					align:'center',
					editor: { 
						xtype:'textfield',
					}
				},
				{
					dataIndex: 'actual_unit',
					text: 'Actuall Billable Units',
					flex: 2,
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
		                	 selModel.getSelection()[0].set('amt_USD', actual);
		                	 selModel.getSelection()[0].set('amt_GBP', actual1);
		                	}
		                }
					}
				},
				{
					dataIndex: 'amt_USD',
					text: 'Actual Billable Amount in $',
					flex: 2,
					align:'center',
					editor: { 
						xtype:'textfield',
					}
				},
				{
					dataIndex: 'amt_GBP',
					text: 'Actual Billable Amount in £',
					flex: 2,
					align:'center',
					editor: { 
						xtype:'textfield',
					}
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
				xtype:'button',
				text:'Save',
				pressed:true,
				width:100,
			//	margin:'0 0 0 100',
				handler:function(){
					 var job_code=Ext.getCmp('job_code').getValue();
					 var projectID=Ext.getCmp('budgetHeader_projectID').getValue();  
				     var rate_USD = '';
				     var rate_GBP= '';
				     var actual_unit= '';
				     var amt_USD = '';
				     var amt_GBP = '';
				     var grid=Ext.getCmp('accountReceiveGrid');
				     
				     var myStore = Ext.getCmp('accountReceiveGrid').getStore();
					myStore.each(function(rec) {
						rate_USD=rate_USD+rec.get('rate_USD')+',';
						rate_GBP=rate_GBP+rec.get('rate_GBP')+',';
						actual_unit=actual_unit+rec.get('actual_unit')+',';
						amt_USD=amt_USD+rec.get('amt_USD')+',';
						amt_GBP=amt_GBP+rec.get('amt_GBP')+',';
					});
					
					 var conn = new Ext.data.Connection();
					 conn.request({
						url: 'service/budget.php',
						method: 'POST',
						params : {action:6,job_code:job_code,projectID:projectID,rate_USD:rate_USD,rate_GBP:rate_GBP,actual_unit:actual_unit,amt_USD:amt_USD,amt_GBP:amt_GBP},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
						}
					});
					
				}
			}
			]
		});
		
		
		this.callParent(arguments);

	}
});