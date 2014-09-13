var sm = Ext.create('Ext.selection.CheckboxModel', {
	checkOnly:true
});

Ext.define('MyDesktop.view.projectmanagement.newproject.artwork.CreateprojectArtworkgrid', {
	extend:'Ext.grid.Panel',
	title: 'Artwork',
	alias:'widget.createprojectArtworkgrid',
	closeAction: 'hide',
	//selModel:sm,
	//width:1040,
	height:225,
	//anchor: '100% 56%',
	//requires:['MyDesktop.store.AuthorGrid','MyDesktop.view.projectmanagement.newproject.author.authorPlusForm'],
	id:'createprojectArtworkgrid',
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
                              // id : 'edit_add_new_artwork',
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
       /** {
				xtype:'exporterbutton',
				text:'Export',
				//margin:'0 0 0 40'
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
                              // id : 'edit_add_new_artwork',
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
                		       author.insert(author.getCount(), r);
            				 }                           
        },
			/*{
				xtype:'button',
				text:'Save',
				pressed:true,
				width:100,
				//	margin:'0 0 0 100',
				handler: function() {
					
					
					var total_cost=0;
					var total_redraws=0;
					var total_relabel=0;
					var total_final=0;
					/*** get value from store
					var myStore = Ext.getCmp('createprojectArtworkgrid').getStore();
					myStore.each(function(rec) {
					
				    total_cost=total_cost+parseInt(rec.get('cost'));
				    
				    total_redraws=total_redraws+parseInt(rec.get('redrawsimple'));
				   
				    total_relabel=total_relabel+parseInt(rec.get('relabel'));
				    total_final=total_final+parseInt(rec.get('finalartwrk'));
				    
				   					
				});
				
				Ext.getCmp('add_total_cost').setValue(total_cost);
				Ext.getCmp('add_total_redraws').setValue(total_redraws);
				Ext.getCmp('add_total_relabel').setValue(total_relabel);
				Ext.getCmp('add_total_final').setValue(total_final);
					
					
				//	var job_code=Ext.getCmp('job_code').getValue();
					var project_id=Ext.getCmp('add_ArtworkHeader_projectID').getValue();

				                   var figurenumber='';
                    				var inputformat= '';
                    				var resolution='';
                 					var colourmode='';
                    				var vendorassessment='';
                    				var cnvrt='';
                    				var redrawsimple='';
                    				var redrawcomplex='';
                    				var relabel='';                				
                    				var finalartwrk='';
                    				var cost='';
                    				var comments='';
                    				var artwork_id='';
					var grid=Ext.getCmp('createprojectArtworkgrid');

					var myStore = Ext.getCmp('createprojectArtworkgrid').getStore();
					myStore.each( function(rec) {

						figurenumber=figurenumber+rec.get('figurenumber')+',';
						inputformat=inputformat+rec.get('inputformat')+',';
						resolution=resolution+rec.get('resolution')+',';
						colourmode=colourmode+rec.get('colourmode')+',';
						vendorassessment=vendorassessment+rec.get('vendorassessment')+',';
						cnvrt=cnvrt+rec.get('convert1')+',';
						redrawsimple=redrawsimple+rec.get('redrawsimple')+',';
						redrawcomplex=redrawcomplex+rec.get('redrawcomplex')+',';
						relabel=relabel+rec.get('relabel')+',';
						finalartwrk=finalartwrk+rec.get('finalartwrk')+',';
						cost=cost+rec.get('cost')+',';
						comments=comments+rec.get('comments')+',';
						artwork_id=artwork_id+rec.get('id')+',';

					});
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/Artwork.php',
						method: 'POST',
						params : {
							action:2,
							
							project_id:project_id,
							figurenumber:figurenumber,
							inputformat:inputformat,
							resolution:resolution,
							colourmode:colourmode,
							vendorassessment:vendorassessment,
							cnvrt:cnvrt,
							redrawsimple:redrawsimple,
							redrawcomplex:redrawcomplex,
							relabel:relabel,
							finalartwrk:finalartwrk,
							cost:cost,
							comments:comments,
							artwork_id:artwork_id
						},
						success: function(response) {
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message);
							//refresh grid
							var grid3=Ext.getCmp('createprojectArtworkgrid');
							grid3.getStore().load({
								params: {
									action:3,
									project_id:project_id
								}
							});

						}
					});

				}
			},*/
			{
						xtype:'textfield',
						fieldLabel:'Total Cost',
						id:'add_total_cost',
						labelWidth:80,
						width:200,
						x:320,
						y:10,
					   
						
					},
					{
						xtype:'textfield',
						fieldLabel:'Total Redraws',
						labelWidth:80,
						id:'add_total_redraws',
						width:200,
						x:420,
						y:10,
					    
						
					},
					{
						xtype:'textfield',
						fieldLabel:'Total Relabel',
						labelWidth:80,
						width:200,
						id:'add_total_relabel',
						x:520,
						y:10,
					 
						
					},
					{
						xtype:'textfield',
						fieldLabel:'Total Final',
						labelWidth:80,
						width:180,
						id:'add_total_final',
						x:620,
						y:10,
					  
						
					},
			{
				
			}
		
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