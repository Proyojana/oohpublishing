Ext.define('MyDesktop.view.projectmanagement.currentprojects.PubForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.pubform',
   		id:'pubform',
    margin: '10 10 10 10',
	
	
	frame:true,
	requires:['MyDesktop.view.projectmanagement.currentprojects.PublisherGrid','MyDesktop.view.projectmanagement.currentprojects.Author','MyDesktop.view.projectmanagement.currentprojects.budgetform','MyDesktop.view.projectmanagement.currentprojects.currentprojectArtworkgrid',
	'MyDesktop.view.projectmanagement.currentprojects.scheduleGrid','MyDesktop.view.projectmanagement.currentprojects.ContribGrid','MyDesktop.view.projectmanagement.currentprojects.NotesGrid','MyDesktop.view.projectmanagement.currentprojects.details',
	'MyDesktop.view.projectmanagement.currentprojects.scheduleForm','MyDesktop.view.projectmanagement.currentprojects.accountReceivableGrid_a'],
    title:'Current Projects',
    defaults: {
        
        labelWidth: 90,

    },

    defaultType: 'textfield',
    layout:'border',
	
	initComponent:function(){
		
		//var heads = Ext.create('MyDesktop.store.HeadedBy');
		//heads.load({params:{action: 5}});
		this.items = [
		
		{
	 
		xtype : 'publishergrid',
		
		region:'west',
		flex:5,
		//anchor: '70%',
	
		width:'70%',
		//height:120,
		},
		{
			
			xtype:'details',
			
			region:'east',
			flex:1.5,
			width:'26%',
			 //margin:'0 0 50 60',
				//x:850,
			//    y:5,
		},
		{
		xtype:'tabpanel',
		id:'currentProjecttab',
		region:'south',	
	//	margin:'40 0 0 0',
		plain:true,		
		y:315,
		activeTab: 0,
		height:280,
		
		items:[{
			//iconCls: 'personalinfo',
			xtype:'notesgrid'
		},
		{
			//iconCls: 'personalinfo',
			xtype:'author'
		},
		{
			///iconCls: 'personalinfo',
			xtype:'contribgrid'
		},
		{
			//iconCls: 'personalinfo',
			xtype:'schedulegrid',
			//title:'Schedule for production',
			//width:500
		},
		{
			//iconCls: 'personalinfo',
			xtype:'budgetform'
		},
		{
			xtype:'current_editaccountReceiveGrid_a'
			
		},
		{
			///iconCls: 'personalinfo',
			xtype:'currentprojectArtworkgrid'
		},
		]
	}]
	  
	
		this.callParent();
	}
     
}); 


