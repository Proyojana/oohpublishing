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
Ext.define('MyDesktop.view.mastermanagement.Vendors.CurrentProjects', {
	extend:'Ext.grid.Panel',
	title: 'Current Projects',
	alias:'widget.vendorcurrentprojects',
	closeAction: 'hide',
	selModel:sm,
    requires:['MyDesktop.store.CurrentProjects'],
	id:'vendorcurrentprojects',
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
		var service = Ext.create('MyDesktop.store.CurrentProjects');
		service.load({
			params: {
				start: 0,
				limit: 50
			}
		});
		service.loadPage(1);
		/*var activity = Ext.create('MyDesktop.store.ProductionStages');
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
		});*/
	
		this.store = service,
		this.tbar = Ext.create('Ext.Toolbar', {  
							   items:[
							   /*{
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
        },    */  
        ]
        });
		this.columns = [
				/*{
					dataIndex: 'ratecardid',
					hidden:true
				},*/
				
				{
					dataIndex: 'cur_proj_code',
					text: 'ProjectCode',
					id:'cur_proj_code',
					width:100,
					align:'center',
					
		           
				},
				{
					dataIndex: 'cur_proj_title',
					text: 'Title',
					id:'cur_proj_title',
					width:100,
					flex:1,
					align:'center',
			
		           
				},
				{
					dataIndex: 'cur_proj_authors',
					id:'cur_proj_authors',
					text: 'Author',
					//width:100,
					align:'center',
					flex:1,
				
				},
				/*{
					dataIndex: 'cur_proj_client',
					id:'cur_proj_client',
					text: 'Client',
					//width:100,
					flex:1,
					align:'center',
				
				},
				*/{
					dataIndex: 'cur_proj_deadline',
					text: 'Agreed Deadline',
					//width:100,
					flex:1,
					align:'center',
				}
				];
		
		
		this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",			
		}),
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
