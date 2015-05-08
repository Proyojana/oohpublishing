var sm = Ext.create('Ext.selection.CheckboxModel', {
	checkOnly:true
});

Ext.define('MyDesktop.view.projectmanagement.editproject.artwork.editprojectArtworkgrid', {
	extend:'Ext.grid.Panel',
	title: 'Artwork',
	alias:'widget.editprojectArtworkgrid',
	closeAction: 'hide',
	//selModel:sm,
	//width:1040,
	height:225,
	//anchor: '100% 56%',
	//requires:['MyDesktop.store.AuthorGrid','MyDesktop.view.projectmanagement.newproject.author.authorPlusForm'],
	id:'editprojectArtworkgrid',
	plugins: [
              Ext.create('Ext.grid.plugin.CellEditing', {
                  clicksToEdit: 1
             })        
    ],
	initComponent: function() {

		var author = Ext.create('MyDesktop.store.Artwork');
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
                               id : 'edit_add_new_artwork',
                               text : 'Insert New Row',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
                              // 	alert("insert");
               						 var r = Ext.create('MyDesktop.model.Artwork', {
               						 	id:'',
               						 figurenumber:'',
                    				inputformat: '',
                    				resolution: '',
                 					colourmode: '',
                    				vendorassessment: '',
                    				cnvrt: '',
                    				redrawsimple: '',
                    				redrawcomplex: '',
                    				relabel: '',                   				
                    				finalartwrk: '',
                    				cost: '',
                    				comments: ''
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
			header: 'Figure Number',
			dataIndex: 'figurenumber',
			align: 'center',
			flex : 1,
			editor: { 
					xtype:'textfield',
					
					}
		},{
			header: 'Input Format',
			dataIndex: 'inputformat',
			align: 'center',
			flex : 1,
			editor: { xtype:'textfield'
					}
		},{
			header: 'Resolution at 140mm',
			dataIndex: 'resolution',
			align: 'center',
			flex : 2,
			editor: { xtype:'textfield'
					}
		},{
			header: 'Colour Mode',
			dataIndex: 'colourmode',
			align: 'center',
			flex:1,
			editor: { xtype:'textfield'
					}
		},{
			header: 'Vendor assessment',
			dataIndex: 'vendorassessment',
			align: 'center',
			flex : 1.5,
			editor: {
				 xtype:'textfield',
					   
					}
		},{
			header: 'Convert?',
			dataIndex: 'convert1',
			align: 'center',
			flex : 1,
			editor: { xtype:'textfield'
					}
		},{
			header: 'Redraw simple',
			dataIndex: 'redrawsimple',
			align: 'center',
			flex : 1,
			editor: { xtype:'textfield',
					
					}
				
		},
		{
			header: 'Redraw complex',
			dataIndex: 'redrawcomplex',
			align: 'center',
			flex : 1.5,
			editor: { xtype:'textfield',
					
					}
					
		},
		{
			header: 'Relabel',
			dataIndex: 'relabel',
			align: 'center',
			flex : 1,
			editor: { xtype:'textfield',
					
					}
					
		},
		{
			header: 'Final',
			dataIndex: 'finalartwrk',
			align: 'center',
			flex : 1,
			editor: { xtype:'textfield',
					
					}
					
		},
		{
			header: 'Cost($)',
			dataIndex: 'cost',
			align: 'center',
			flex : 1,
			editor: { xtype:'textfield',
					
					}
					
		},
		{
			header: 'Comments',
			dataIndex: 'comments',
			align: 'center',
			flex : 1,
			editor: { xtype:'textfield',
					
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
				var project_id=Ext.getCmp('edit_ArtworkHeader_projectID').getValue(); 
						var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('figurenumber')+' ?',+rec.get('figurenumber'), function (button) {
							if (button == 'yes') {
								var id=rec.get('id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/Artwork.php',
									method: 'POST',
									params : {action:4,id:id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message);
										
										Ext.getCmp('editprojectArtworkgrid').getView().refresh(); 
										var grid3=Ext.getCmp('editprojectArtworkgrid');
									grid3.getStore().load({params:{action:3,project_id:project_id}});
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
			{
                               xtype : 'button',
                               id : 'edit_add_new_artwork',
                               text : 'Insert New Row',
                               pressed:true,
                             
                               width : 100,
                               height : 25,
                               handler : function() {
                              // 	alert("insert");
               						 var r = Ext.create('MyDesktop.model.Artwork', {
               						 	id:'',
               						 figurenumber:'',
                    				inputformat: '',
                    				resolution: '',
                 					colourmode: '',
                    				vendorassessment: '',
                    				cnvrt: '',
                    				redrawsimple: '',
                    				redrawcomplex: '',
                    				relabel: '',                   				
                    				finalartwrk: '',
                    				cost: '',
                    				comments: ''
                				});
                		       author.insert(author.getCount(), r);
            				 }                           
        },{
                               xtype : 'button',
                               id : 'edit_refresh_new_artwork',
                               text : 'Refresh',
                               pressed:true,
                               x : 500,
                               y : 10,
                               width : 100,
                               height : 25,
                               handler : function() {
                              		author.reload();
            				 }                           
        },
			
			
			{
				
			}
		
			],
			listeners: {
							afterrender : function() {
								this.child('#refresh').hide();
							}		
						}	
			
		}),

		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);