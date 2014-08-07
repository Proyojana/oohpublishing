Ext.define('MyDesktop.view.projectmanagement.editproject.team.TeamGrid', {
	extend:'Ext.grid.property.Grid',
	alias:'widget.edit_teamgrid',
	closeAction: 'hide',
	
	height:250,
	title:'Team Info',
	hideHeaders:true,
	id:'edit_teamgrid',
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
