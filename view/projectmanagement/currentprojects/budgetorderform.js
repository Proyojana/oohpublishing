var required = '<span style= "color:red;font-weight:bold" data-qtip="Required">*</span>';
  /*var available = Ext.create('Ext.data.Store', {
        fields: ['period1', 'name1'],
        data : [
         {"period1":"A", "name1":"A"},
            {"period1":"B", "name1":"B"},
            {"period1":"C", "name1":"C"},
            {"period1":"D", "name1":"D"}
        ]
    });*/
Ext.define('MyDesktop.view.projectmanagement.currentprojects.budgetorderform' , {
	 extend: 'Ext.form.FieldSet',
	alias : 'widget.budgetorderform',
	id:'budgetorderform',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:400,
	title:'Order Numbers',
	defaults: {
		labelWidth:60,
	},
	//requires:['MyDesktop.store.Dept'],
	defaultType: 'textfield',
	initComponent:function(){
		
	/*var dept=Ext.create('MyDesktop.store.Dept');
	dept.load({params:{action: 1}});
	dept.loadPage(1);
	var deg=Ext.create('MyDesktop.store.DegreeGrid');
	deg.load({params:{action:1}});
	deg.loadPage(1);*/
		this.items= [
		
	{			
			fieldLabel: 'USD PO',				
			x:01,
			y:10,	
			width:160,	
			allowBlank: false,
			
			},
			{			
			fieldLabel: 'GBP PO',		
			x:01,
			width:160,
			//width:250,
			y:40,		
			allowBlank: false,
			
			},
    		]
	
	this.callParent();
}
});