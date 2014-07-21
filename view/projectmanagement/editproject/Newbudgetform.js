Ext.define('MyDesktop.view.projectmanagement.newproject.Newbudgetform' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.newbudgetform',
   		id:'newbudgetform',
    margin: '10 10 10 10',
	layout: {
                                type: 'absolute'
                            },
	
	frame:true,
	requires:['MyDesktop.view.projectmanagement.newproject.CreatebudgetGrid','MyDesktop.view.projectmanagement.newproject.Createbudgetaddform',
	'MyDesktop.view.projectmanagement.newproject.Createbudgetorderform'],
   title:'Budget',
    defaults: {
        
        labelWidth: 70,

    },

    defaultType: 'textfield',
	
	initComponent:function(){
		//var heads = Ext.create('MyDesktop.store.HeadedBy');
		//heads.load({params:{action: 5}});
		this.items = [
		{
		xtype : 'createbudgetgrid',
		title:'Budget',
		width:660,
		height:400,
		x:10,
		y:10
		},
       {
		xtype : 'createbudgetaddform1',
		//title:'Schedule for production',
		anchor:'76% 92%',
		x:'52%',
		y:10
		},
		{
		xtype : 'createbudgetorderform',
		//title:'Schedule for production',
			width:200,
		height:170,
		x:'80%',
		y:10
		},
		
		
			]
	  
	
		this.callParent();
	}
     
}); 


