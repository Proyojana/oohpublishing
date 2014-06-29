Ext.define('MyDesktop.view.projectmanagement.currentprojects.PubForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.pubform',
   		id:'pubform',
    margin: '10 10 10 10',
	layout: {
                                type: 'absolute'
                            },
	
	frame:true,
	requires:['MyDesktop.view.projectmanagement.currentprojects.PublisherGrid','MyDesktop.view.projectmanagement.currentprojects.Author','MyDesktop.view.projectmanagement.currentprojects.budgetform','MyDesktop.view.projectmanagement.currentprojects.AddChargesGrid','MyDesktop.view.projectmanagement.currentprojects.scheduleGrid','MyDesktop.view.projectmanagement.currentprojects.ContribGrid','MyDesktop.view.projectmanagement.currentprojects.NotesGrid','MyDesktop.view.projectmanagement.currentprojects.details','MyDesktop.view.projectmanagement.currentprojects.scheduleForm'],
    title:'Current Projects',
    defaults: {
        
        labelWidth: 90,

    },

    defaultType: 'textfield',
	
	initComponent:function(){
		//var heads = Ext.create('MyDesktop.store.HeadedBy');
		//heads.load({params:{action: 5}});
		this.items = [
		{
		xtype : 'publishergrid',
		width:800,
		height:220,
		},
		{
			xtype:'details',
				x:850,
			y:5,
		},
		{
		xtype:'tabpanel',
		id:'currentProjecttab',
		plain:true,		
		y:295,
		activeTab: 0,
		height:310,
		
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
			xtype:'scheduleform',
			title:'Schedule for production',
			//width:500
		},
		{
			//iconCls: 'personalinfo',
			xtype:'budgetform'
		},
		{
			///iconCls: 'personalinfo',
			xtype:'addchargesgrid'
		},]
	}]
	  
	
		this.callParent();
	}
     
}); 


