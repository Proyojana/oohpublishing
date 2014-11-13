
/*Completed project details**/

Ext.define('MyDesktop.view.projectmanagement.completedprojects.TitleInfoGrid', {
	extend:'Ext.grid.property.Grid',
	alias:'widget.titleinfogridCP',
	closeAction: 'hide',
	
	height:190,
	title:'Title Info',
	hideHeaders:true,
	id:'titleinfogridCP',
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



