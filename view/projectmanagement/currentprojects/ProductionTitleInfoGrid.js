Ext.define('MyDesktop.view.projectmanagement.currentprojects.ProductionTitleInfoGrid', {
	extend:'Ext.grid.property.Grid',
	alias:'widget.ptitleinfogrid',
	closeAction: 'hide',
	//title:'Title Info',
	//height:220,
	hideHeaders:true,
	id:'ptitleinfogrid',
	listeners: {
        'beforeedit': {
            fn: function () {
                return false;
            }
        }
   },
	 source: {
             "Title": "",
             "Author": "",
              "HB ISBN": "",
               "PB ISBN": "",
                "Format": "",
                "Design": "",
                 "Cost-off Extent":"",
                  "Confirmed Extent": "",
                  "Client deadline": "",
                  "Agreed deadline": "",
                   "Word count": "",
        }	
});
