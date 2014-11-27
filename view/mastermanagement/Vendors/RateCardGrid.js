var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			/* var available = Ext.create('Ext.data.Store', {
        fields: ['period1', 'name1'],
        data : [
         {"period1":"Month", "name1":"Month"},
            {"period1":"Year", "name1":"Year"}
        ]
    });
     var available1 = Ext.create('Ext.data.Store', {
        fields: ['period1', 'name1'],
        data : [
         {"period1":"Fixed", "name1":"Fixed"},
            {"period1":"Variable", "name1":"Variable"}
        ]
    });*/
   var ratecard = Ext.create('Ext.data.JsonStore', {
   fields: ['Activity','Name', 'Email','Phone'],
   });
Ext.define('MyDesktop.view.mastermanagement.Vendors.RateCardGrid', {
	extend:'Ext.grid.Panel',
	title: 'Rate Card',
	alias:'widget.ratecardgrid',
	closeAction: 'hide',
	selModel:sm,
	requires:['MyDesktop.store.Service'],
	id:'ratecardgrid',
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
			
		var ratecard = Ext.create('MyDesktop.store.RateCardGrid');
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
                               id : 'addnewrow',
                               text : 'Insert New Row',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
               						 var r = Ext.create('MyDesktop.model.RateCardGrid', {
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
					id:'rate_activity',
					width:100,
					align:'center',
					editor:
					{ 
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

		        /**     listeners : {
				afterrender : function() {
					var code = Ext.getCmp('basiccode').getValue();
						service.load({params:{action:8,code:code}}); 
				}
			}**/
		           
				},
				{
					dataIndex: 'uom',
					text: 'Units of Measurements',
					id:'uom',
					width:100,
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
					id:'usd',
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
					var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						
						Ext.Msg.confirm('Remove Record '+rec.get('activity')+' ?',+rec.get('activity'),function (button) {
							if (button == 'yes') {
								var id=rec.get('ratecardid');
								var vendorid=Ext.getCmp('basicid').getValue();
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/Vendors_ratecard.php',
									method: 'POST',
									params : {action:3,ratecardid:id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										var grid1=Ext.getCmp('Vendors_ratecardgridTab');
						                grid1.getStore().load({params:{action:1,vendorid:vendorid}});
						                Ext.getCmp('ratecardgrid').getStore().reload();
                                Ext.getCmp('ratecardgrid').getView().refresh();
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
						var rec = grid.getStore().getAt(rowIndex);
								var vendorid=Ext.getCmp('basicid').getValue();
								var id=Ext.getCmp('basicid').getValue();
								var activity=rec.get('activity');
								var uom=rec.get('uom');
								var dollars=rec.get('dollars');
								var pounds=rec.get('pounds');
								var ratecardid=rec.get('ratecardid');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/Vendors_ratecard.php',
									method: 'POST',
									params : {action:4,activity:activity,uom:uom,dollars:dollars,pounds:pounds,ratecardid:ratecardid,vendorid:vendorid},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully saved', obj.message); 
										var grid1=Ext.getCmp('Vendors_ratecardgridTab');
						grid1.getStore().load({params:{action:1,vendorid:id}});
									},
									failure:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('saving Failed !', obj.message); 
									}
								});
					
				}
			}]
		}];
		
		
		this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
			items:[
				{
				xtype:'button',
				text:'Save',
				pressed:true,
				width:100,
			//	margin:'0 0 0 100',
				handler:function(){
					
					 var vendorid=Ext.getCmp('basicid').getValue();
					 var id=Ext.getCmp('basicid').getValue();
							var activity='';
							var uom='';
							var dollars='';
							var pounds='';
							var ratecardid='';
							
							var grid=Ext.getCmp('Vendors_ratecardgridTab');
							
					var myStore = Ext.getCmp('Vendors_ratecardgridTab').getStore();
					myStore.each(function(rec) {
						
				    activity=activity+rec.get('activity')+',';
				    uom=uom+rec.get('uom')+',';
				    dollars=dollars+rec.get('dollars')+',';
				    pounds=pounds+rec.get('pounds')+',';
				    ratecardid=ratecardid+rec.get('ratecardid')+',';
				    
				   					
				});
				var conn = new Ext.data.Connection();
				      
					conn.request({
									url: 'service/Vendors_ratecard.php',
									method: 'POST',
									params : {action:2,activity:activity,uom:uom,dollars:dollars,pounds:pounds,ratecardid:ratecardid,vendorid:vendorid},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully saved', obj.message); 
										var grid1=Ext.getCmp('Vendors_ratecardgridTab');
						grid1.getStore().load({params:{action:1,vendorid:id}});
									},
									failure:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('saving Failed !', obj.message); 
									}
								});
					
				}
			},
			]
		}),
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
