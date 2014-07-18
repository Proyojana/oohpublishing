Ext.define('MyDesktop.view.projectmanagement.currentprojects.TeamGrid', {
	extend:'Ext.grid.property.Grid',
	alias:'widget.teamgrid',
	closeAction: 'hide',
	
	height:190,
	title:'Title Info',
	hideHeaders:true,
	id:'teamgrid',
	 source: {
	 		 "Job Code":"",
             "Project Manger": "",
             "Production Editor": "",
              "Proof Reader": "",
               "Indexer": "",
                "Copy Editor": "",
                "Typesetter": "",               
        }	
});
