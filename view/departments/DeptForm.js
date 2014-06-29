Ext.define('MyDesktop.view.departments.DeptForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.deptform',
   		id:'deptform',
    margin: '10 10 10 10',
	layout: {
                                type: 'absolute'
                            },
	
	frame:true,
	requires:['MyDesktop.view.departments.DeptGrid','MyDesktop.view.departments.DeptAddForm'],
    title:'Departments',
    defaults: {
        
        labelWidth: 90,

    },

    defaultType: 'textfield',
	
	initComponent:function(){
		//var heads = Ext.create('MyDesktop.store.HeadedBy');
		//heads.load({params:{action: 5}});
		this.items = [
		{
		xtype : 'deptgrid',
		},
		{
		xtype:'tabpanel',
		id:'tab',
		plain:true,
		x:5,
		y:280,
		activeTab: 0,
		height:275,
		defaults: {
			bodyStyle:'padding:10px'
		},
		items:[{
			//iconCls: 'personalinfo',
			xtype:'deptaddform'
		},
		
		
		]
	}
			]
	  
	
		this.callParent();
	}
     
}); 


