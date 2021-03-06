Ext.define('MyDesktop.view.projectmanagement.completedprojects.PubForm' ,
{
    extend: 'Ext.form.Panel',
    alias : 'widget.pubformCP',
   	id:'pubformCP',
    margin: '10 10 10 10',
	
	frame:true,
	requires:['MyDesktop.view.projectmanagement.completedprojects.PublisherGrid','MyDesktop.view.projectmanagement.completedprojects.Author','MyDesktop.view.projectmanagement.completedprojects.budgetGrid','MyDesktop.view.projectmanagement.completedprojects.completedprojectArtworkgrid','MyDesktop.view.projectmanagement.completedprojects.scheduleGrid','MyDesktop.view.projectmanagement.completedprojects.ContribGrid','MyDesktop.view.projectmanagement.completedprojects.NotesGrid','MyDesktop.view.projectmanagement.completedprojects.details','MyDesktop.view.projectmanagement.completedprojects.scheduleForm','MyDesktop.view.projectmanagement.completedprojects.accountReceivableGrid_a'],
    title:'Completed Projects',
    defaults: 
    {
        
        labelWidth: 90,

    },

    defaultType: 'textfield',
	layout:'border',
	initComponent:function()
	{
		//var heads = Ext.create('MyDesktop.store.HeadedBy');
		//heads.load({params:{action: 5}});
		this.items = [
		{
			xtype : 'publishergridCP',
			//width:830,
			region:'west',
			flex:5,
			width:'70%',
	
		},
		{
			xtype:'detailsCP',
			region:'east',
			flex:1.5,
			width:'26%',
		},
		{
			xtype:'tabpanel',
			id:'tabCP',
			region:'south',
			plain:true,
			y:315,
			activeTab: 0,
			height:280,
				
			items:[
			{
				//iconCls: 'personalinfo',
				xtype:'notesgridCP'
			},
			{
				//iconCls: 'personalinfo',
				xtype:'authorCP'
			},
			{
				///iconCls: 'personalinfo',
				xtype:'contribgridCP'
			},
			{
				//iconCls: 'personalinfo',
				xtype:'schedulegridCP',
				title:'Schedule Grid',
				//width:500
			},
			{
				//iconCls: 'personalinfo',
				xtype:'budgetgridCP'
			},
			{
				xtype:'completed_editaccountReceiveGrid_a'
				
			},						
			{
				///iconCls: 'personalinfo',
				xtype:'completeprojectArtworkgrid'
			},
			]
			
	}]
	  
	
		this.callParent();
	}
     
}); 


