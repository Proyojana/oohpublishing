Ext.define('MyDesktop.view.projectmanagement.completedprojects.PubForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.pubformCP',
   		id:'pubformCP',
    margin: '10 10 10 10',
	layout: {
                                type: 'absolute'
                            },
	
	frame:true,
	requires:['MyDesktop.view.projectmanagement.completedprojects.PublisherGrid','MyDesktop.view.projectmanagement.completedprojects.Author','MyDesktop.view.projectmanagement.completedprojects.budgetGrid','MyDesktop.view.projectmanagement.completedprojects.AddChargesGrid','MyDesktop.view.projectmanagement.completedprojects.scheduleGrid','MyDesktop.view.projectmanagement.completedprojects.ContribGrid','MyDesktop.view.projectmanagement.completedprojects.NotesGrid','MyDesktop.view.projectmanagement.completedprojects.details','MyDesktop.view.projectmanagement.completedprojects.scheduleForm'],
    title:'Completed Projects',
    defaults: {
        
        labelWidth: 90,

    },

    defaultType: 'textfield',
	
	initComponent:function(){
		//var heads = Ext.create('MyDesktop.store.HeadedBy');
		//heads.load({params:{action: 5}});
		this.items = [
		{
		xtype : 'publishergridCP',
		width:830,
		},
		{
			xtype:'detailsCP',
			x:850,
			y:5,
		},
		{
		xtype:'tabpanel',
		id:'tabCP',
		plain:true,
		x:5,
		y:265,
		activeTab: 0,
		height:235,
		
		items:[{
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
			xtype:'scheduleformCP',
			title:'Schedule for production',
			//width:500
		},
		{
			//iconCls: 'personalinfo',
			xtype:'budgetgridCP'
		},
		{
			///iconCls: 'personalinfo',
			xtype:'addchargesgridCP'
		},]
		
	}]
	  
	
		this.callParent();
	}
     
}); 


