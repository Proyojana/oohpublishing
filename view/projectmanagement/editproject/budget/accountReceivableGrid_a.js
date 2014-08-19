var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
var encode = false;

Ext.define('MyDesktop.view.projectmanagement.editproject.budget.accountReceivableGrid_a', {
	extend:'Ext.grid.Panel',
	title:'Budget Accounts Receivables',
	alias:'widget.editaccountReceiveGrid_a',
	closeAction: 'hide',
	width:1100,
	requires:['MyDesktop.model.Receive_a'],
	id:'editaccountReceiveGrid_a',
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
	var activity = Ext.create('MyDesktop.store.ProductionStages');
		activity.load({
			params: {
				start: 0,
				limit: 8
			}
		});
	var budget = Ext.create('MyDesktop.store.Receive_a');
		budget.load({
			params: {
				start: 0,
				limit: 50
			}
		});
		budget.loadPage(1);
		this.store = budget,
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
               						var r = Ext.create('MyDesktop.model.Receive_a', {
               						budgetReceive_id:'',
               						activity_name:'',
               						uom:'',
               						rate_USD: '',
               						rate_GBP: '',
               						actual_unit:'',
               						amt_USD:'',
               						amt_GBP:''
                				});
                		       budget.insert(0, r);
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
				},*/
				 {
					dataIndex: 'activity_name',
					text: 'Activity',
					flex: 1,
					align:'center',
					 editor: { 
						xtype:'combo',
						store: activity,
						queryMode: 'local',
						displayField: 'product_name',
						valueField: 'product_id',
						},
				    renderer: function(value) {
					var index = activity.find('product_id', value);
					if (index != -1) {
					return activity.getAt(index).data.product_name;
					}
					return value;
					}
				},
				{
					dataIndex: 'uom',
					text: 'Unit Of Measurement',
					flex: 1,
					align:'center',
					editor: { 
						xtype:'textfield',
					}
				},
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
		                	 selModel.getSelection()[0].set('amt_USD', actual);
		                	 selModel.getSelection()[0].set('amt_GBP', actual1);
		                	}
		                }
					}
				},
				{
					dataIndex: 'amt_USD',
					text: 'Actual Billable Amount in $',
					flex: 1.5,
					align:'center',
					editor: { 
						xtype:'textfield',
					}
				},
				{
					dataIndex: 'amt_GBP',
					text: 'Actual Billable Amount in £',
					flex: 1.5,
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
					 var job_code=Ext.getCmp('edit_Job_code').getValue();
					 var projectID=Ext.getCmp('budgetHeader_projectID').getValue();  
					 var activity_name = '';
					 var uom = '';
				     var rate_USD = '';
				     var rate_GBP= '';
				     var actual_unit= '';
				     var amt_USD = '';
				     var amt_GBP = '';
				     var grid=Ext.getCmp('editaccountReceiveGrid_a');
				     /**variable declaration**/
					var total_USD=0;
					var total_GBP=0;
					
				     var myStore = Ext.getCmp('editaccountReceiveGrid_a').getStore();
					 myStore.each(function(rec) {
						total_USD=total_USD+parseInt(rec.get('amt_USD'));
						total_GBP=total_GBP+parseInt(rec.get('amt_GBP'));
						type=1;
						activity_name=activity_name+rec.get('activity_name')+',';
						uom=uom+rec.get('uom')+',';
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
						params : {action:11,job_code:job_code,projectID:projectID,activity_name:activity_name,uom:uom,rate_USD:rate_USD,rate_GBP:rate_GBP,actual_unit:actual_unit,amt_USD:amt_USD,amt_GBP:amt_GBP},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
						}
					});
					 Ext.getCmp('edit_total_receive_USD').setValue(total_USD);
					 Ext.getCmp('edit_total_receive_GBP').setValue(total_GBP);
										}
			}
			]
		});
		
		
		this.callParent(arguments);

	}
});