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
Ext.define('MyDesktop.view.projectmanagement.newproject.NewCreateScheduleAddForm' , {
	 extend: 'Ext.form.FieldSet',
	alias : 'widget.newcreatescheduleaddform',
	id:'newcreatescheduleaddform',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:700,
	title:'Basic Information',
	defaults: {
		labelWidth: 130,
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
		//id:'thesis_code',
		fieldLabel: 'e-book QA done',
		x:01,		
		y:10,
		 emptyText:'ENTER DATE',
		allowBlank: false,
	},
	{
		//id:'thesis_code',
		fieldLabel: 'QA done',
		x:05,		
		y:40,
		emptyText:'ENTER DATE',
		allowBlank: false,
	},
		
		{
		//id:'thesis_code',
		fieldLabel: 'Vocher loaded',
		x:05,		
		y:70,
		emptyText:'ENTER DATE',
		allowBlank: false,
	},
		
		{
		//id:'thesis_code',
		fieldLabel: 'Vocher approved',
		x:05,		
		y:100,
		emptyText:'ENTER DATE',
		allowBlank: false,
	},
		
		{
		//id:'thesis_code',
		fieldLabel: 'Final files loaded',
		x:300,		
		y:05,
		emptyText:'ENTER DATE',
		allowBlank: false,
	},
	
		 {
    	xtype: 'radiogroup',
		fieldLabel: 'Index Included?',
		//id:'guide',
		x:300,
		y:40,
		width:335,
			// 	id:'guide',
				columns: 2,
			// columnWidth: .25,
				columns: [50, 50],
			defaults: {
			//labelWidth: 250,
	
				name: 'guide' //Each radio has the same name so the browser will make sure only one is checked at once
				},
				items: [
					{
					//id : 'true',
					//name : 'guide',
					inputValue : '1',
					boxLabel : 'Yes1',

					},
				{
					//id : 'false',
				//name : 'guide',
				inputValue : '0',
				boxLabel : 'No1',
				//checked: true,
				}],


				}
		
	
    		]
	
	this.callParent();
}
});