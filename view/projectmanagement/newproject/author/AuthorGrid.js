var sm = Ext.create('Ext.selection.CheckboxModel', {
	checkOnly:true
});
var author123 = Ext.create('Ext.data.Store', {
        fields: ['author_type'],
        data : [
         {"author_type":"Main Contact"},
            {"author_type":"Author"},
            {"author_type":"Editor"},
            {"author_type":"Other"},
        ]
    });
var store1 = Ext.create('Ext.data.JsonStore', {
	fields: ['author','name','addr', 'email','tel','seeproof', 'noproof'],
	data: [{
		"author": "Author",
		"name":"Henry Fielding",
		"addr": "Sharpham, Glastonbury, Somerset, England",
		"email": "henry@gmail.com",
		"tel":"2548794463",
		"seeproof": "yes",
		"noproof": "1"
	},

	]
});
Ext.define('MyDesktop.view.projectmanagement.newproject.author.AuthorGrid', {
	extend:'Ext.grid.Panel',
	title: 'Author/ Editor',
	alias:'widget.new_author_grid',
	closeAction: 'hide',
	//selModel:sm,
	//width:1040,
	height:200,
	//anchor: '100% 56%',
	requires:['MyDesktop.store.AuthorGrid','MyDesktop.view.projectmanagement.newproject.author.authorPlusForm'],
	id:'new_author_grid',
	plugins: [
              Ext.create('Ext.grid.plugin.CellEditing', {
                  clicksToEdit: 1
             })        
    ],
	initComponent: function() {

		var author = Ext.create('MyDesktop.store.AuthorGrid');
		author.load({
			params: {
				start: 0,
				limit: 50
			}
		});
	this.store = author,
	this.tbar = Ext.create('Ext.Toolbar', {  
							   items:[{
                               xtype : 'button',
                               id : 'add_new_author',
                               text : 'Insert New Row',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
                              // 	alert("insert");
               						 var r = Ext.create('MyDesktop.model.AuthorGrid', {
               						 author:'',
                    				name: '',
                    				address: '',
                 					email: '',
                    				phone: '',
                    				see_proof: '',
                    				no_proof: ''
                				});
                		       author.insert(0, r);
            				 }                           
        },
        
        ]
        });
		this.columns = [
		{
			dataIndex:'id',
			hidden:true,
		},
		
		{
			header: 'Author/Editor',
			dataIndex: 'author',
			align: 'center',
			flex : 1,
			editor: { 
					xtype:'combo',
					store: author123,
		        	queryMode: 'local',
		       		displayField: 'author_type',
					}
		},{
			header: 'Name',
			dataIndex: 'name',
			align: 'center',
			flex : 1,
			editor: { xtype:'textfield'
					}
		},{
			header: 'Address',
			dataIndex: 'address',
			align: 'center',
			flex : 2,
			editor: { xtype:'textfield'
					}
		},{
			header: 'Email',
			dataIndex: 'email',
			align: 'center',
			flex:1,
			editor: { xtype:'textfield'
					}
		},{
			header: 'Telephone',
			dataIndex: 'phone',
			align: 'center',
			flex : 1,
			editor: { xtype:'textfield',
					   hideTrigger:true,
					}
		},{
			header: 'To see proofs?',
			dataIndex: 'see_proof',
			align: 'center',
			flex : 1,
			editor: { xtype:'checkbox'
					}
		},{
			header: 'No of Proofs',
			dataIndex: 'no_proof',
			align: 'center',
			flex : 1,
			editor: { xtype:'textfield',
					  hideTrigger:true,
					}
		},{
			xtype:'actioncolumn',
			align: 'center',
			flex : 0.5,
			//width:250,
			text:'Actions',
			items: [
			/*{
				iconCls: 'editClass',
				//icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
				tooltip: 'Edit',
			},*/{
				iconCls: 'deleteClass',
				tooltip: 'Delete',
				handler:function(grid, rowIndex, colIndex)
				{
				//	alert("delete");
				var job_code=Ext.getCmp('job_code').getValue(); 
						var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('name')+' ?',+rec.get('name'), function (button) {
							if (button == 'yes') {
								var id=rec.get('id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/Author.php',
									method: 'POST',
									params : {action:5,id:id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										var grid3=Ext.getCmp('new_author_grid');
									grid3.getStore().load({params:{action:2,job_code:job_code}});
									},
									failure:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Deletion Failed !', obj.message); 
									}
								});
								
								
							}
						});
					}
					 
				}
			}]
		}

		];
		this.bbar = Ext.create('Ext.PagingToolbar', {
			store : this.store,
			items:[
		/**	{
				xtype:'button',
				text:'Save',
				pressed:true,
				width:100,
				margin:'0 0 0 100',
				handler:function(grid, rowIndex, colIndex){
					var job_code=Ext.getCmp('job_code').getValue(); 
					//alert(job_code);
					var c='';var d='';
					var e=''; var f='';
					var g=''; var h='';
					var i=''; var b='';
					var grid=Ext.getCmp('new_author_grid');
							
					var myStore = Ext.getCmp('new_author_grid').getStore();
					myStore.each(function(rec) {
					b=b+rec.get('id')+',';
					c=c+rec.get('author')+',';
				    d=d+rec.get('name')+',';
				    e=e+rec.get('address')+'_';
				    f=f+rec.get('email')+',';
				    g=g+rec.get('phone')+',';
				    h=h+rec.get('see_proof')+',';
				    i=i+rec.get('no_proof')+',';
				});
				//alert(e);	
				//	 alert(b);
					 //alert(tid);	
					// alert(secid);
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/Author.php',
						method: 'POST',
						params : {action:1,id:b,job_code:job_code,author:c,name:d,address:e,email:f,phone:g,see_proof:h,no_proof:i},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
						}
					});
					var currentForm = Ext.getCmp('newprojectBudgetHeaderForm');
                
                	
						
						currentForm.getForm().load({
   								 url: 'service/budget.php',
							     params: {
        						 	action:2,job_code:job_code
							    },
							      failure: function(form, action){
						        Ext.Msg.alert("Load failed", action.result.errorMessage);
    							}
							   
							   
						});
					var grid3=Ext.getCmp('accountPayableGrid');
									grid3.getStore().load({params:{action:1,job_code:job_code}});
					var grid3=Ext.getCmp('new_author_grid');
					grid3.getStore().load({params:{action:2,job_code:job_code}});
					//Ext.getCmp('newprojectbudgetformTab').setDisabled(false);	
					Ext.getCmp('newprojectauthorformTab').setDisabled(false);	
				}
			},**/
			// For Additional sets
		/*	{
				xtype:'button',
				text:'Plus',
				pressed:true,
				width:100,
				margin:'0 0 0 150',
				handler:function(){
				
					var win = Ext.create("Ext.window.Window", {
		            layout: 'fit',
		            modal: true,
		            maximizable: true,
		            width: 350,
		            title:'Additional Sets',
		            id:'open_plus_win',
		            height: 250,
		            items:[{
                		xtype: 'authorplusform',
           		 }]
        });
        win.show();
					
				}
			}*/
			],
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display"
		}),

		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);