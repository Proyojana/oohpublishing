var available = Ext.create('Ext.data.Store', {
	fields: ['Chapter_number', 'surname','email','approve','Sent','Back'],
	data : [{
		"Chapter_number":"4",
		"surname":"George",
		"email":"george@gmail.com",
		"approve":"3",
		"Sent":"14/01/2014",
		"Back":"21/01/2014"
	},{
		"Chapter_number":"4",
		"surname":"Brian",
		"email":"brian@gmail.com",
		"approve":"3",
		"Sent":"23/01/2014",
		"Back":""
	},

	]
});
Ext.define('MyDesktop.view.projectmanagement.editproject.author.ContribGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.edit_contrib_grid',
	closeAction: 'hide',
	id:'edit_contrib_grid',
	title:'Contributors',
	plugins: [
	Ext.create('Ext.grid.plugin.CellEditing', {
		clicksToEdit: 1
	})
	],
	initComponent: function() {

		var contributor = Ext.create('MyDesktop.store.ContribGrid');
		contributor.load({
			params: {
				start: 0,
				limit: 50
			}
		});
		this.store = contributor,
		/*this.tbar = Ext.create('Ext.Toolbar', {
		 items:[{
		 xtype : 'button',
		 id : 'edit_new_contrib',
		 text : 'Insert New Row',
		 pressed:true,
		 x : 500,
		 y : 10,
		 width : 100,
		 height : 25,
		 handler : function() {
		 // 	alert("insert");
		 var r = Ext.create('MyDesktop.model.ContribGrid', {
		 chap_num:'',
		 contrib_name: '',
		 email: '',
		 see_proof: '',
		 proof_sent: '',
		 proof_back: ''
		 });
		 contributor.insert(0, r);
		 }
		 },

		 ]
		 });*/
		this.columns = [{
			dataIndex: 'Id',
			hidden:true,
			editor: {
				xtype:'textfield'
			}
		},{
			dataIndex: 'chap_num',
			text: 'Chapter Number',
			align: 'center',
			flex:1,
			editor: {
				xtype:'textfield'
			}
		},{
			dataIndex: 'contrib_name',
			text: 'Contributor Name',
			align: 'center',
			flex:1,
			editor: {
				xtype:'textfield'
			}
		},{
			dataIndex: 'email',
			text: 'Email Address',
			align: 'center',
			flex:2,
			editor: {
				xtype:'textfield'
			}
		},{
			dataIndex: 'see_proof',
			text: 'To See Proofs?',
			align: 'center',
			flex:2,
			editor: {
				xtype:'checkbox'
			}

		},{
			dataIndex: 'proof_sent',
			text: 'Proof Sent',
			align: 'center',
			flex:2,
			editor: {
				xtype:'datefield',
			}

		},{
			dataIndex: 'proof_back',
			text: 'Proof Back',
			align: 'center',
			flex:2,
			editor: {
				xtype:'datefield',
			}

		},{
			xtype:'actioncolumn',
			align: 'center',
			flex : 1,
			width:250,
			text:'Actions',
			items: [/*{
			 iconCls: 'viewClass',
			 tooltip: 'View',
			 },{
			 iconCls: 'editClass',
			 //icon: 'inc/ext/resources/shared/icons/fam/cog_edit.png',  // Use a URL in the icon config
			 tooltip: 'Edit',
			 },*/

			{
				iconCls: 'deleteClass',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex) {
					// alert("delete");
					var edit_Job_code=Ext.getCmp('editauthHeader_Job').getValue();
					//alert(edit_Job_code);
					var grid = this.up('grid');
					if (grid) {
						var rec = grid.getStore().getAt(rowIndex);
						Ext.Msg.confirm('Remove Record '+rec.get('contrib_name')+' ?',+rec.get('contrib_name'), function (button) {
							if (button == 'yes') {
								var id=rec.get('id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/Author.php',
									method: 'POST',
									params : {
										action:6,
										id:id
									},
									success: function(response) {
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message);
										var grid3=Ext.getCmp('edit_contrib_grid');
										grid3.getStore().load({
											params: {
												action:4,
												job_code:edit_Job_code
											}
										});

									},
									failure: function(response) {
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Deletion Failed !', obj.message);
									}
								});

							}
						});
					}
				}
			}

			]
		}

		];
		this.bbar = Ext.create('Ext.PagingToolbar', {

			store : this.store,
			items:[{
				xtype : 'button',
				id : 'edit_new_contrib',
				text : 'Insert New Row',
				pressed:true,
				x : 500,
				y : 10,
				width : 100,
				height : 25,
				handler : function() {
					// 	alert("insert");
					var r = Ext.create('MyDesktop.model.ContribGrid', {
						chap_num:'',
						contrib_name: '',
						email: '',
						see_proof: '',
						proof_sent: '',
						proof_back: ''
					});
					contributor.insert(contributor.getCount(), r);
				}
			},

			],
			displayInfo: true,
			displayMsg: 'Displaying topics {0} - {1} of {2}',
			emptyMsg: "No topics to display",

		}),

		this.callParent(arguments);

	}
});

// Load first data page
//    employee.loadPage(1);