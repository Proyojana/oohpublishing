var sm = Ext.create('Ext.selection.CheckboxModel', {
	checkOnly:true
});
var author123 = Ext.create('Ext.data.Store', {
        fields: ['author_type'],
        data : [
         {"author_type":"Main Contact"},
            {"author_type":"Author"},
            {"author_type":"Editor"}
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
Ext.define('MyDesktop.view.projectmanagement.editproject.author.AuthorGrid', {
	extend:'Ext.grid.Panel',
	title: 'Author/ Editor',
	alias:'widget.edit_author_grid',
	closeAction: 'hide',
	//selModel:sm,
	//width:1040,
	height:200,
	//anchor: '100% 56%',
	requires:['MyDesktop.store.AuthorGrid','MyDesktop.view.projectmanagement.newproject.author.authorPlusForm'],
	id:'edit_author_grid',
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
	/*this.tbar = Ext.create('Ext.Toolbar', {  
							   items:[{
                               xtype : 'button',
                               id : 'edit_add_new_author',
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
        });*/
		this.columns = [
		{
			dataIndex:'id',
			hidden:true,
		},
		{
			dataIndex:'job_code',
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
			editor: { xtype:'textfield',
			          vtype:'email',
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
				var rec = grid.getStore().getAt(rowIndex);
					console.log(AuthorEditJobCode.value);
						var grid = this.up('grid');
					if (grid) {
						
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
						   items:[{
                               xtype : 'button',
                               id : 'edit_add_new_author',
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
                		       author.insert(author.getCount(), r);
            				 }                           
        },
        
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