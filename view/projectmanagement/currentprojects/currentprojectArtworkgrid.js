var sm = Ext.create('Ext.selection.CheckboxModel', {
	checkOnly:true
});

Ext.define('MyDesktop.view.projectmanagement.currentprojects.currentprojectArtworkgrid', {
	extend:'Ext.grid.Panel',
	title: 'Artwork',
	alias:'widget.currentprojectArtworkgrid',
	closeAction: 'hide',
	//selModel:sm,
	//width:1040,
	height:225,
	//anchor: '100% 56%',
	//requires:['MyDesktop.store.AuthorGrid','MyDesktop.view.projectmanagement.newproject.author.authorPlusForm'],
	id:'currentprojectArtworkgrid',
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
					
		}

		];
		this.bbar = Ext.create('Ext.PagingToolbar', {
			 	store : this.store,
			items:[
			/*{
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
        },*/
			
			
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