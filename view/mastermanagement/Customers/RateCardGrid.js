var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			
   var ratecard = Ext.create('Ext.data.JsonStore', {
   fields: ['Activity','Name', 'Email','Phone'],
   });
Ext.define('MyDesktop.view.mastermanagement.Customers.RateCardGrid', {
	extend:'Ext.grid.Panel',
	title: 'Rate Card',
	alias:'widget.ratecardcust',
	closeAction: 'hide',
	selModel:sm,
	requires:['MyDesktop.store.Service'],
	id:'ratecardcust',
	plugins: [
              Ext.create('Ext.grid.plugin.CellEditing', {
                  clicksToEdit: 1,
                  id:'editing',
                  listeners: {
                  'edit': function (editor,e) {
		                  	var grid = e.grid;
		                  	var record=e.record;
                 			var code = e.value;
                 			
                 		   	}
				}
             })        
    ],
	initComponent: function() {
	
		/**var service = Ext.create('MyDesktop.store.Service');
		service.load({
			params: {
				start: 0,
				limit: 50
			}
		});**/
		var activity = Ext.create('MyDesktop.store.ProductionStages');
		activity.load({
			params: {
				start: 0,
				limit: 50
			}
		});
			activity.loadPage(1);
	
		var ratecard = Ext.create('MyDesktop.store.CustomersRateCardGrid');
		ratecard.load({
			params: {
				start: 0,
				limit: 50
			}
		});
	
		this.store = ratecard,
		this.tbar = Ext.create('Ext.Toolbar', {  
							   items:[{
                               xtype : 'button',
                               id : 'addnewrowcust',
                               text : 'Insert New Row',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
               						 var r = Ext.create('MyDesktop.model.RateCardGrid', {
               						 ratecardid:'',
                    				activity: '',
                    				uom: '',
                 					dollars: '',
                    				pound: ''
                				});
                		       ratecard.insert(0, r);
            				 }                           
        },
        
        ]
        });
		this.columns = [
				{
					dataIndex: 'ratecardid',
					hidden:true
				},
				
				{
					dataIndex: 'activity',
					text: 'Activity',
					
					//width:100,
					align:'center',
					flex:1,
					editor:
					{ 
					id:'servicescust',
					xtype:'combo',
					store: activity,
		        	queryMode: 'local',
		       		displayField: 'product_name',
		        	valueField: 'product_id',
		        	mode: 'local',
			
			   	   triggerAction: 'all',
			   	   /**listeners : {
				afterrender : function() {
					var custcode = Ext.getCmp('custbasiccode').getValue();
						service.load({params:{action:7,custcode:custcode}}); 
				}
			}*/
		           },
		          
		           
				},
				{
					dataIndex: 'uom',
					text: 'Units of Measurements',
					id:'uomcust',
					//width:100,
					flex:1,
					align:'center',
					editor:
					{ 
					xtype:'combo',
					store: ['Per Page', 'Per activity'],
		        	//queryMode: 'local',
		       		displayField: 'salarycode',
		        	//valueField: 'salaryid',
		        	//alert(code);
		           },
		           
				},
				{
					dataIndex: 'dollars',
					id:'usdcust',
					text: 'Dollars (USD)',
					//width:100,
					align:'center',
					flex:1,
					editor:
					{
						 xtype:'textfield'
		            }
				},
				{
					dataIndex: 'pounds',
					text: 'Pounds (GBP)',
					//width:100,
					flex:1,
					align:'center',
					editor:
					{
						 xtype:'textfield'
		            }
				},
				
								
		{
			xtype:'actioncolumn',
			align: 'center',
			width:150,
			text:'Actions',
			
			items: [
			{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
					handler: function(grid, rowIndex, colIndex) {
						var teams_customerid = Ext.getCmp('basic_customerid').getValue();
						var grid = this.up('grid');
					if (grid) {
						       	var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('activity')+' ?',+rec.get('activity'), function (button) {
							if (button == 'yes') {
								var id=rec.get('ratecardid');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/customer_Ratecard.php',
									method: 'POST',
									params : {action:3,ratecardid:id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										 var grid2=Ext.getCmp('customerratecardformTab');
						                 grid2.getStore().load({params:{action:1,customerid:teams_customerid}});
									},
									failure:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Deletion Failed !', obj.message); 
									}
								});
								
								
							}
						});
					}
					
					}
				},
				{
				iconCls: 'saveClass',
				tooltip: 'save',
				handler: function(grid, rowIndex, colIndex) {
					var grid = this.up('grid');
					if (grid) {
						        var rec = grid.getStore().getAt(rowIndex);
						        var teams_customerid = Ext.getCmp('basic_customerid').getValue();
								var activity=rec.get('activity');
								var uom=rec.get('uom');
								var dollars=rec.get('dollars');
								var pounds=rec.get('pounds');
								var ratecardid=rec.get('ratecardid');								
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/customer_Ratecard.php',
									method: 'POST',
									params : {action:2,activity:activity,uom:uom,dollars:dollars,pounds:pounds,ratecardid:ratecardid,teams_customerid:teams_customerid},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully saved', obj.message); 
										country.load({
											params: {
												start: 0,
												limit: 50
											}
										});
									},
									failure:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('saving Failed !', obj.message); 
									}
								});
					}
					
					
				}
			}]
		}];
		
		this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display"
		}),
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
