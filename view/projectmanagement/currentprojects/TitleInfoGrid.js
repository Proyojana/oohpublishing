var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			var available = Ext.create('Ext.data.Store', {
    fields: ['parameter','value'],
    data : [
         {"parameter":"Title",          			"value":"Tom Jones"},
          {"parameter":"Author",          			"value":"Henry Fielding"},
         {"parameter":"HB ISBN",          			"value":"23345345"},
           {"parameter":"PB ISBN",          			"value":"23345345456"},
            
               {"parameter":"Format",          			"value":"Html"},
                 {"parameter":"Design",          			"value":"Html"},
                   {"parameter":"Agreed Deadline",          			"value":"25/08/2014"},
           
            
        ]
    });
var exp = Ext.create('Ext.data.Store', {
    fields: ['period', 'name'],
    data : [
         {"period":"Visible Page", "name":"Visible Page"},
            {"period":"All", "name":"All"}
        ]
    });    
     var encode = false;
    
    // configure whether filtering is performed locally or remotely (initially)
    var local = true;

		/*	 var filters = {
        ftype: 'filters',
        // encode and local configuration options defined previously for easier reuse
        encode: encode, // json encode the filter query
        local: local,   // defaults to false (remote filtering)
        filters: [{
            type: 'string',
            dataIndex: 'firstname',
            disabled: false
        }, {
            type: 'numeric',
            dataIndex: 'price'
        }, {
            type: 'date',
            dataIndex: 'doj'
        }, {
            type: 'list',
            dataIndex: 'size',
            options: ['small', 'medium', 'large', 'extra large'],
            phpMode: true
        }, {
            type: 'boolean',
            dataIndex: 'visible'
        }]
    };*/
Ext.define('MyDesktop.view.projectmanagement.currentprojects.TitleInfoGrid', {
	extend:'Ext.grid.Panel',
	//features:[filters],
	//title: 'Title Info',
	alias:'widget.titleinfogrid',
	closeAction: 'hide',
	
	height:190,
	title:'Title Info',
	//requires : ['MyDesktop.store.reviewer'],
	//requires : ['MyDesktop.store.City','MyDesktop.view.city.CityImportForm'],
	hideHeaders:true,
	id:'titleinfogrid',
	initComponent: function() {
		
		
		this.store = available,
			this.columns = [
				
				{
					dataIndex: 'parameter',
					text: 'Parameter',
					align: 'left',
					
					store:available,
					flex:1,
					
				},
				{
					dataIndex: 'value',
					text: 'value',
					align: 'left',
					store:available,
					
					flex:1,
					
				},
				
					
					];
		/*this.bbar = Ext.create('Ext.PagingToolbar', {  

			store : this.store,
			//displayInfo: true,
			//displayMsg: 'Displaying topics {0} - {1} of {2}',
			//emptyMsg: "No topics to display",
			items:[
			]
			
		}),*/
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
