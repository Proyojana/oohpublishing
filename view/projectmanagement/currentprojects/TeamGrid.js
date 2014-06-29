var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			var available = Ext.create('Ext.data.Store', {
    fields: ['parameter','value'],
    data : [
         {"parameter":"Project Manager",          			"value":"Walden"},
          {"parameter":"Production Editor",          			"value":"Augustina"},
         {"parameter":"Copy Editor",          			"value":"Taja"},
           {"parameter":"Proof Reader",          			"value":"Clover"},
             {"parameter":"Indexer",          			"value":"Katrine"},
               {"parameter":"Typesetter",          			"value":"Cliff"},
                        
            
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
Ext.define('MyDesktop.view.projectmanagement.currentprojects.TeamGrid', {
	extend:'Ext.grid.Panel',
	//features:[filters],
	//title: 'Title Info',
	alias:'widget.teamgrid',
	closeAction: 'hide',
	
	height:190,
	title:'Team',
	//requires : ['MyDesktop.store.reviewer'],
	//requires : ['MyDesktop.store.City','MyDesktop.view.city.CityImportForm'],
	hideHeaders:true,

	id:'teamgrid',
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
	/*	this.bbar = Ext.create('Ext.PagingToolbar', {  

			store : this.store,
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
			items:[
			/*{
                               xtype : 'button',
                               id : 'city_bulk',
                               text : 'Delete',
                               pressed:true,
                               //iconCls: 'fileuploads',
                               x : 500,
                               y : 10,
                               //disabled:true,
                               width : 100,
                               height : 25,
                               handler : function() {
                                       
                                       var selection = Ext.getCmp('citygrid').getSelectionModel().getSelection();
                                       
                                       if(selection.length==0) {

                                               Ext.Msg.alert("Select atleast one");
                                       } else {
                                       		var length=selection.length;
                                       	Ext.Msg.confirm('Remove selected Record(s)?','', function (button) {
										if (button == 'yes') {

                                               var check='';
                                              
                                               for (var i=0; i < selection.length; i++)
                                               {
		                                               
		                                              
				                                            if((length-1)>i)
				                                            {
				                                            check = check + selection[i].data.cityid+',';
				                                           
				                                            }
				                                            else
				                                            {
				                                                    check = check + selection[i].data.cityid;
				                                                  
				                                            }                                                                                
                                               
                                               }
                                               
                                               
                                                       var conn = new Ext.data.Connection();
                                               conn.request({
                                                       url: 'service/City.php',
                                                       method: 'POST',
                                                       params : {
                                                               action:6,
                                                               id:check
                                                       },
                                                       success:function(response){
                                                       obj = Ext.JSON.decode(response.responseText);
                                                       Ext.Msg.alert('Message', obj.message); 
                                                       Ext.getCmp('citygrid').getStore().reload();
                                                          
                                                       }
                                               });
                                           }});            
                                                               
                                       }                                        
                               }
                       },
			{
				xtype:'combo',
				store:available,
				displayField:'name1',
				id:'bulk_city',
				valueField: 'period1',
				margin:'0 0 0 30',
				listeners: 
				{
                  afterrender: function(combo) {
                  var recordSelected = combo.getStore().getAt(0);                     
                  combo.setValue(recordSelected.get('period1'));
                  } 
                }
			},
			{
				xtype:'button',
				text:'Go',
			/*	handler:function(grid,rowIndex,colIndex){
					
				   var selection = Ext.getCmp('citygrid').getSelectionModel().getSelection();
                                       if(selection.length==0) {
                                               Ext.Msg.alert("Select atleast one");
                                       }
                                        else {
                                        var select=Ext.getCmp('bulk_city').getValue();
										if(select=='edit')
										alert("EDIT");
										else{
                                       	var length=selection.length;
                                       	Ext.Msg.confirm('Remove selected Record(s)?','', function (button) {
										if (button == 'yes') {
                                               var check='';
                                               for (var i=0; i < selection.length; i++)
                                               {
		                                                   if((length-1)>i)
				                                            {
				                                            check = check + selection[i].data.cityid+',';
				                                            }
				                                            else
				                                            {
				                                                    check = check + selection[i].data.cityid;
				                                            }                                                                                
                                               }
                                               var conn = new Ext.data.Connection();
                                               conn.request({
                                                       url: 'service/City.php',
                                                       method: 'POST',
                                                       params : {
                                                               action:6,
                                                               id:check
                                                       },
                                                       success:function(response){
                                                       obj = Ext.JSON.decode(response.responseText);
                                                       Ext.Msg.alert('Message', obj.message); 
                                                       Ext.getCmp('citygrid').getStore().reload();
                                                          
                                                       }
                                               });
                                              }});                 
                                       }                                       
					}
				}		
			},
			{
				xtype:'combo',
				store:exp,
				displayField:'name',
				valueField: 'period',
				margin:'0 0 0 60',
				listeners: 
				{
                  afterrender: function(combo) {
                  var recordSelected = combo.getStore().getAt(0);                     
                  combo.setValue(recordSelected.get('period'));
                  } 
                }
			},
			{
				xtype:'exporterbutton',
				text:'Export',
				//margin:'0 0 0 40'
			},
						{
    		xtype:'button',
    		x:260,
    		y:10,
    		width:50,
            text:'csv',
            iconCls :'csvfileuploadClass',
           // renderTo:body,
            handler:function() {
            	
     	var body = Ext.getBody();
      
   var frame = body.createChild({
         tag:'iframe'
        ,cls:'x-hidden'
        ,id:'iframe'
        ,name:'iframe'
    });
        
    var form = body.createChild({
         tag:'form'
        ,cls:'x-hidden'
        ,id:'form'
        ,action:'service/citycsv.php'
        ,target:'iframe'
    });
                         form.dom.submit();
                                }
			},
			{
				xtype : 'button',
				text : 'Import',
				
			/*	handler : function() {
				var win = Ext.create('Ext.Window', {
					extend : 'Ext.form.Panel',
					layout : {
						type : 'absolute'
					},
					maximizable : true,
					title : 'Csv Upload Form',
					frame : true,
					width : 400,
					height : 250,
					items : [					
				{
					//xtype : 'cityimprtform',
				}			
					],
					
				})
				win.show();
			}

			}]
			
		}),*/
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
