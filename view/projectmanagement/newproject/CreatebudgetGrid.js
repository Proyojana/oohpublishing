
    var budget = Ext.create('Ext.data.Store', {
   fields: ['Id', 'Activity','Level','Page_rate1','Page_rate2','Sub_total','Sub_total1'],
   data : [
        {"Activity":"Project Manager", "Level":"tbc","Page_rate1":"$2.00","Page_rate2":"3","Sub_total":"4","Sub_total1":"8"},
         {"Activity":"Typesetting", "Level":"tbc","Page_rate1":"$20.00","Page_rate2":"3","Sub_total":"4","Sub_total1":"8"},  
         {"Activity":"Copyediting", "Level":"tbc","Page_rate1":"$20.00","Page_rate2":"3","Sub_total":"4","Sub_total1":"8"},  
       ]
   });
Ext.define('MyDesktop.view.projectmanagement.newproject.CreatebudgetGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.createbudgetgrid',
	anchor: '50% 89%',
	closeAction: 'hide',
	
	//height:200,
	//requires : ['MyDesktop.store.freelancer'],
	title:'Budget',
	id:'createbudgetgrid',
	plugins: [
             Ext.create('Ext.grid.plugin.CellEditing', {
                 clicksToEdit: 1,
                  markDirty: true,
                   listeners: {
                 'edit': function (editor,e) {
                                         var grid = e.grid;
                                                    var record = e.record;
                                                    if(record.data.status==2 || record.data.status==3)
                                                    return false;
                                   }
                               }
             })        
   ],
	initComponent: function() {
		
	/*	var ci = Ext.create('MyDesktop.store.freelancer');
		ci.load({
			params: {
				start: 0,
				limit: 8
			}
		});
		ci.loadPage(1);*/
		this.store = budget,
			this.columns = [
			{
				xtype:'rownumberer',				
			},
				{
					dataIndex: 'Id',
					hidden:true
				},
				{
					dataIndex: 'Activity',
					text: 'Activity',
					align: 'left',
					flex:1.5,
					editor:{
					 	xtype:'textfield'
                        },
				},
				{
					dataIndex: 'Level',
					text: 'Level',
					align: 'center',
					flex:0.5,
					editor:{
					 	xtype:'textfield'
                        },
				},
				
				{
					dataIndex: 'Page_rate1',
					text: '$ Page rate',
					align: 'center',
					flex:1,
					editor:{
					 	xtype:'textfield'
                        },
				},
				{
					dataIndex: 'Page_rate2',
					text: '	Â£ Page rate',
					align: 'center',
					flex:1,
					editor:{
					 	xtype:'textfield'
                        },
				},
				{
					dataIndex: 'Sub_total',
					text: '$ Sub-total',
					align: 'center',
					flex:1,
					editor:{
					 	xtype:'textfield'
                        },
				},
				{
					dataIndex: 'Sub_total1',
					text: '	Â£ Sub-total',
					align: 'center',
					flex:1,
					editor:{
					 	xtype:'textfield'
                        },
                	
				},
				
				
		{
					xtype:'actioncolumn',
					align: 'center',
					flex:1,
				//	width:180,
					text:'Actions',
					items: [{
						iconCls: 'viewClass',
						tooltip: 'View',
		
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
			
			},{
					iconCls: 'deleteClass',
					tooltip: 'Delete',
			
				}]
		}];
		this.bbar = Ext.create('Ext.PagingToolbar', {  

			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
			items:[
			]
			
		}),
		
		this.callParent(arguments);

	}
});
//    employee.loadPage(1);
