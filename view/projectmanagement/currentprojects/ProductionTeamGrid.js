Ext.define('MyDesktop.view.projectmanagement.currentprojects.ProductionTeamGrid', {
	extend:'Ext.grid.property.Grid',
	alias:'widget.pteamgrid',
	closeAction: 'hide',
	//title:'Team',
	//height:110,
	hideHeaders:true,
	//enableColumnResize: true,
	id:'pteamgrid',
	listeners: {
        'beforeedit': {
            fn: function () {
                return false;
            }
        }
   },
	 source: {
             "Production Editor": "",
             "Project Manager": "",
              "Copy Editor": "",
               "Proof Reader": "",
                "Indexer": "",
               }	
});
