var sm = Ext.create('Ext.selection.CheckboxModel',{
           checkOnly:true
			});
			var available = Ext.create('Ext.data.Store', {
    fields: ['stage', 'daysperstage','date','weekday'],
    data : [
         {"stage":"Received",          			"daysperstage":"0" ,    "date":"1/1/01",	     "weekday":"Mon"},
         {"stage":"Start Normalizing",  		"daysperstage":"3" ,	"date":"13/1/01", 	 "weekday":"Thu"},
         {"stage":"Report Due",          		"daysperstage":"0" ,	"date":"15/1/01",	 "weekday":"Fri"},
          {"stage":"Normalized File Due",         "daysperstage":"0" ,	"date":"12/1/01",	 "weekday":"Fri"},
           {"stage":"Copy Editing Starts",       "daysperstage":"7" ,	"date":"19/1/01",	 "weekday":"Fri"},
           
            
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

Ext.define('MyDesktop.view.projectmanagement.currentprojects.scheduleGrid', {
	extend:'Ext.grid.Panel',
	//features:[filters],
	//title: 'Schedule for production',
	alias:'widget.schedulegrid',
	closeAction: 'hide',
	
	height:250,
	//width:700,
	//title:'Schedule For Production',
	
	id:'schedulegrid',
	initComponent: function() {
		
		
		this.store = available,
			this.columns = [
				{
					dataIndex: 'reviewerid',
					hidden:true
				},
				{
					dataIndex: 'stage',
					text: 'Stage',
					align: 'center',
					
					store:available,
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				{
					dataIndex: 'daysperstage',
					text: 'Days Per Stage',
					align: 'center',
						store:available,
				
					flex:1,
					filter: {
                	type: 'string'
           		}
				},
				
				{
					dataIndex: 'date',
					text: 'Date',
					flex:1,
						store:available,
					align: 'center',
					//width:270,
					filter: {
                	type: 'string'
           		}
				},{
					dataIndex: 'weekday',
					text: 'Weekday?',
					flex:1,
					align: 'center',
						store:available,
					//width:270,
					filter: {
                	type: 'string'
           		}
				},
				
			
				
				{
					xtype:'actioncolumn',
					align: 'center',
					//width:250,
					text:'Actions',
					items: [{
						iconCls: 'viewStudentClass',
						tooltip: 'View',
				/*	handler: function(grid, rowIndex, colIndex) {
					    var currentForm = Ext.getCmp('reviewerform');
					    
						var rec = grid.getStore().getAt(rowIndex);
						var reviewerid=rec.get('reviewerid');
						var guide = rec.get('guide');
						
						if(guide=='1')
						{
							Ext.getCmp('true').setValue(true);
						}
						else
						{
							Ext.getCmp('false').setValue(true);
						}
						
					    Ext.getCmp('reviewercode').setReadOnly(true);
					    	
					    var conn = new Ext.data.Connection();
					 conn.request({
					 url: 'service/reviewer.php',
					 method: 'POST',
					 params : {action:10,reviewerid:reviewerid},
					 success:function(response){
					 obj1 = Ext.JSON.decode(response.responseText);
					 row=obj1.message;
				
					 if(row == 0){
					 	
					 	Ext.getCmp('courseoffgrid').getEl().hide();					 	
					    Ext.getCmp('courevdisplay').getEl().show();
					   
					 }
					 else
					 {
					 	//alert(row);
					 	Ext.getCmp('courevdisplay').getEl().hide();
					 var grid1=Ext.getCmp('courseoffgrid');		
					 			
						grid1.getStore().load({params:{action:9,reviewerid:reviewerid}});	
						
					     Ext.getCmp('courseoffgrid').getEl().show();
					   
					 }
					 }
					 });
					   
						currentForm.getForm().load({
   								 url: 'service/reviewer.php',
							     params: {
        						 	action:2,reviewerid:reviewerid
							    },
							    
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
						Ext.getCmp('reviewertab').layout.setActiveItem('reviewerform');
						
						Ext.getCmp('reviewercode').setReadOnly(true);
						Ext.getCmp('reviewerid').setReadOnly(true);
						Ext.getCmp('reviewername').setReadOnly(true);
						Ext.getCmp('reviewerdesc').setReadOnly(true);
						Ext.getCmp('mail').setReadOnly(true);
						Ext.getCmp('department').setReadOnly(true);
						Ext.getCmp('course').setReadOnly(true);
						Ext.getCmp('designation').setReadOnly(true);
						Ext.getCmp('guide').setReadOnly(true);						
						Ext.getCmp('course').getEl().hide();	
						Ext.getCmp('designation').setPosition(450,70,true);
						Ext.getCmp('guide').setPosition(450,100,true);
									
						Ext.getCmp('add_reviewer').getEl().hide();
						Ext.getCmp('edit_reviewer').getEl().hide();
						Ext.getCmp('reset_reviewer').getEl().hide();
						
						
    					
    					
    					Ext.getCmp('revieweraddform').setTitle('View State');
						
				}*/
			},{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
			/*	handler: function(grid, rowIndex, colIndex) {
					
					    var currentForm = Ext.getCmp('reviewerform');
						var rec = grid.getStore().getAt(rowIndex);
						var reviewerid=rec.get('reviewerid');
						var guide=rec.get('guide');
						
						if(guide =='yes')
						{
							Ext.getCmp('guide').setValue(true);
						}
						else{
							Ext.getCmp('guide').setValue(true);
						}
						Ext.getCmp('reviewercode').setReadOnly(true);
						var grid1=Ext.getCmp('courseoffgrid');
						grid1.getStore().load({params:{action:8,reviewerid:reviewerid}});
						currentForm.getForm().load({
   								 url: 'service/reviewer.php',
							     params: {
        						 	action:2,reviewerid:reviewerid,
							    },
							    failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
						});
						
						Ext.getCmp('reviewertab').layout.setActiveItem('reviewerform');
						Ext.getCmp('reviewercode').setReadOnly(false);
						Ext.getCmp('reviewerid').setReadOnly(false);
						Ext.getCmp('reviewername').setReadOnly(false);
						Ext.getCmp('reviewerdesc').setReadOnly(false);
						Ext.getCmp('mail').setReadOnly(false);
						Ext.getCmp('department').setReadOnly(false);
						Ext.getCmp('course').setReadOnly(false);
						Ext.getCmp('designation').setReadOnly(false);
						Ext.getCmp('guide').setReadOnly(false);
								
									
						
						    Ext.getCmp('course').getEl().show();	
							Ext.getCmp('designation').setPosition(450,100,true);
							Ext.getCmp('guide').setPosition(450,130,true);
						(Ext.getCmp('course').getEl().show();	
						if(Ext.getCmp('course').getEl().show()==true)
						{
							Ext.getCmp('designation').setPosition(450,70,true);
							Ext.getCmp('guide').setPosition(450,100,true);
						}
						
						Ext.getCmp('add_reviewer').getEl().show();
						Ext.getCmp('edit_reviewer').getEl().show();
						Ext.getCmp('reset_reviewer').getEl().show();
						
    					
    					
    					Ext.getCmp('revieweraddform').setTitle('Edit Reviewer');
						
				}*/
			},{
					iconCls: 'deleteStudentClass',
					tooltip: 'Delete',
			/*	handler: function(grid, rowIndex, colIndex) {
					var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('reviewercode')+' ?',+rec.get('reviewercode'), function (button) {
							if (button == 'yes') {
								var reviewerid=rec.get('reviewerid');
							//	alert(reviewerid);
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/reviewer.php',
									method: 'POST',
									params : {action:3,reviewerid:reviewerid},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										
										ci.load({params:{start: 0, limit: 50}});
									},
									failure:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Deletion Failed !', obj.message); 
									}
								
								});
								
								
							}
						});
					}
					
					}*/
				}]
		}];
		this.bbar = Ext.create('Ext.PagingToolbar', {  

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

			}*/]
			
		}),
		
		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);
