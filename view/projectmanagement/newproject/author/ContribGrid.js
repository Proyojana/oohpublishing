
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
Ext.define('MyDesktop.view.projectmanagement.newproject.author.ContribGrid', {
	extend:'Ext.grid.Panel',
	alias:'widget.new_contrib_grid',
	closeAction: 'hide',

		height:200,
	//requires : ['MyDesktop.store.freelancer'],
	//anchor: '76% 30%',
	id:'new_contrib_grid',
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
	this.tbar = Ext.create('Ext.Toolbar', {  
							   items:[
       {
                               iconCls:'informationClass',
                             
                              
                                                            
                               tooltip:'Contributors should receive a PDF proof for their chapter. Send this directly by email. 1.Volume editors will usually collate the corrections themselves: this is a part of their contract with Cambridge. 2.Typesetting scales include four sets of black and white A4 proofs. 3.No voucher is required. 4.Ensure additional hardcopy proofs (author revises for example) are recorded in the column above so that we can recover the appropriate costs from the client'
                               //margin:'0 0 0 40'
                       },
        ],
        
        });
		this.columns = [{
			dataIndex: 'Id',
			hidden:true
		},{
			dataIndex: 'chap_num',
			text: 'Chapter Number',
			align: 'center',
			flex:1,
			editor: { xtype:'textfield'
					}
		},{
			dataIndex: 'contrib_name',
			text: 'Contributor Name',
			align: 'center',
			flex:1,
			editor: { xtype:'textfield'
					}
		},{
			dataIndex: 'email',
			text: 'Email Address',
			align: 'center',
			flex:2,
			editor: { xtype:'textfield'
					}
		},{
			dataIndex: 'see_proof',
			text: 'To See Proofs?',
			align: 'center',
			flex:2,
			editor: { xtype:'checkbox'
					}

		},{
			dataIndex: 'proof_sent',
			text: 'Proof Sent',
			align: 'center',
			flex:2,
			editor: { xtype:'datefield',
					}

		},{
			dataIndex: 'proof_back',
			text: 'Proof Back',
			align: 'center',
			flex:2,
			editor: { xtype:'datefield',
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
						Ext.Msg.confirm('Remove Record '+rec.get('contrib_name')+' ?',+rec.get('contrib_name'), function (button) {
							if (button == 'yes') {
								var id=rec.get('id');
								var conn = new Ext.data.Connection();
								conn.request({
									url: 'service/Author.php',
									method: 'POST',
									params : {action:6,id:id},
									success:function(response){
										obj = Ext.JSON.decode(response.responseText);
										Ext.Msg.alert('Successfully Deleted', obj.message); 
										var grid3=Ext.getCmp('new_contrib_grid');
									grid3.getStore().load({params:{action:4,job_code:job_code}});
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
                               id : 'add_new_contrib',
                               text : 'Insert New Row',
                               pressed:true,
                              
                               
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
			/*{
				xtype:'button',
				text:'Save',
				pressed:true,
				width:100,
				margin:'0 0 0 100',
				handler:function(){
					var job_code=Ext.getCmp('job_code').getValue(); 
					var c='';var d='';
					var e=''; var f='';
					var g=''; var h='';
					var i=''; var b='';
					var grid=Ext.getCmp('new_author_grid');
							
					var myStore = Ext.getCmp('new_contrib_grid').getStore();
					myStore.each(function(rec) {
					b=b+rec.get('id')+',';
					c=c+rec.get('chap_num')+',';
				    d=d+rec.get('contrib_name')+',';
				    e=e+rec.get('email')+',';
				    f=f+rec.get('see_proof')+',';
				    g=g+rec.get('proof_sent')+',';
				    h=h+rec.get('proof_back')+',';
				  //  i=i+rec.get('no_proof')+',';
				});
				//alert(e);	
					 //alert(d);
					 //alert(tid);	
					// alert(secid);
					var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/Author.php',
						method: 'POST',
						params : {action:3,id:b,job_code:job_code,chap_num:c,contrib_name:d,email:e,see_proof:f,proof_sent:g,proof_back:h},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
						}
					});
					
					var grid3=Ext.getCmp('new_contrib_grid');
					grid3.getStore().load({params:{action:4,job_code:job_code}});
					Ext.getCmp('newprojectbudgetformTab').setDisabled(false);	
				}
			}*/
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