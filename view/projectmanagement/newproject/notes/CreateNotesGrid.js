var sm = Ext.create('Ext.selection.CheckboxModel', {
	checkOnly:true
});

Ext.define('MyDesktop.view.projectmanagement.newproject.notes.CreateNotesGrid', {
	extend:'Ext.grid.Panel',
	title: 'Notes & Remainders',
	alias:'widget.newprojectNotesgrid',
	closeAction: 'hide',
	id:'newprojectNotesgrid',
	plugins: [
	Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 1,
		markDirty: true,

	})
	],

	width:'auto',
	initComponent: function() {

		var notes = Ext.create('MyDesktop.store.Notes');
		notes.load({
			params: {
				start: 0,
				limit: 50
			}
		});
		notes.loadPage(1);
		this.store = notes,
		/*this.tbar = Ext.create('Ext.Toolbar', {
			items:[{
				xtype : 'button',
				text : 'Insert New Row',
				pressed:true,
				x : 500,
				y : 10,
				width : 100,
				height : 25,
				handler : function() {
					var r = Ext.create('MyDesktop.model.Notes', {
						id:'',
						dateraised: '',
						narrative: '',
						dateresolved:''

					});
					notes.insert(0, r);
				}
			},

			]
		}); */
		this.columns = [{
			dataIndex: 'id',
			hidden:true
		},{
			dataIndex: 'dateraised',
			text: 'Date Raised',
			align: 'center',
			flex:1,
			editor: {
				xtype:'datefield'
			},
		},{
			dataIndex: 'narrative',
			text: 'Narrative',
			align: 'center',
			flex:3,
			editor: {
				xtype:'textfield'
			},

		},{
			dataIndex: 'dateresolved',
			text: 'Date Resolved',
			flex:1,
			//	store:available,
			align: 'center',

			editor: {
				xtype:'datefield'
			},
		},{
			xtype:'actioncolumn',
			align: 'center',
			flex : 0.5,
			width:250,
			text:'Actions',
			items: [{
				iconCls: 'deleteClass',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex) {
						
						var grid = this.up('grid');
					if (grid) {
						var project_id=Ext.getCmp('editnotesHeader_projectID').getValue(); 
						       	var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('')+' ?',+rec.get('narrative'), function (button) {
							if (button == 'yes') {
								var id=rec.get('id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/notes.php',
									method: 'POST',
									params : {action:4,id:id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										  var grid3=Ext.getCmp('editnotesgrid');
											grid3.getStore().load({
												params: {
													action:3,
													project_id:project_id
												}
											});

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
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",
			items:[{
				xtype : 'button',
				text : 'Insert New Row',
				pressed:true,
				x : 500,
				y : 10,
				width : 100,
				height : 25,
				handler : function() {
					var r = Ext.create('MyDesktop.model.Notes', {
						id:'',
						dateraised: '',
						narrative: '',
						dateresolved:''

					});
					notes.insert(0, r);
				}
			},
     /*  {
				xtype:'button',
				text:'Save',
				pressed:true,
				width:100,
				//	margin:'0 0 0 100',
				handler: function() {
					var job_code=Ext.getCmp('job_code').getValue();
					var project_id=Ext.getCmp('addnotesHeader_projectID').getValue();
alert(job_code);
					var dateresolved='';
					var narrative='';
					var dateraised='';
					var notes_id='';
					var grid=Ext.getCmp('newprojectNotesgrid');

					var myStore = Ext.getCmp('newprojectNotesgrid').getStore();
					myStore.each( function(rec) {

						dateresolved=dateresolved+rec.get('dateresolved')+',';
						narrative=narrative+rec.get('narrative')+',';
						dateraised=dateraised+rec.get('dateraised')+',';
						notes_id=notes_id+rec.get('id')+',';

					});
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/notes.php',
						method: 'POST',
						params : {
							action:2,
							project_id:project_id,
							dateresolved:dateresolved,
							narrative:narrative,
							dateraised:dateraised,
							notes_id:notes_id
						},
						success: function(response) {
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message);
							//refresh grid
							var grid3=Ext.getCmp('newprojectNotesgrid');
							grid3.getStore().load({
								params: {
									action:3,
									project_id:project_id
								}
							});
							
							
								Ext.getCmp('newprojectartworkformTab').setDisabled(false);
							 var currentHeaderForm = Ext.getCmp('createprojectArtworkHeaderForm');
							

							currentHeaderForm.getForm().load({
								url: 'service/Artwork.php',
								params: {
									action:5,
									job_code:job_code
								},
								
							});
							Ext.getCmp('newprojecttab').layout.setActiveItem('newprojectartworkformTab');


                         
						}
						
						
					});

				}
			},*/

			]

		}),

		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);