Ext.define('MyDesktop.view.projectmanagement.currentprojects.TitleInfoGrid', {
	extend:'Ext.grid.property.Grid',
	alias:'widget.titleinfogrid',
	closeAction: 'hide',
	
	height:190,
	title:'Title Info',
	hideHeaders:true,
	id:'titleinfogrid',
	 source: {
             "Title": "",
             "Job Code": "",
              "HB ISBN": "",
               "PB ISBN": "",
                "Format": "",
                "Design": "",
                 "Castoff-Extent":"",
                  "Confirmed Extent": "",
        }	
});
