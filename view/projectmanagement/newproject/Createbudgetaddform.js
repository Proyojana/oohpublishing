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
Ext.define('MyDesktop.view.projectmanagement.newproject.Createbudgetaddform' , {
	 extend: 'Ext.form.FieldSet',
	alias : 'widget.createbudgetaddform1',
	id:'createbudgetaddform1',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:700,
	title:'Project archiving: DOH Management Only',
	defaults: {
		labelWidth: 100,
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
			fieldLabel: 'Job Number',
			name: 'reviewername',
			align:'center',
			x:01,
			y:0,		
			allowBlank: false,
			
			},
			
			{   
				xtype: 'checkbox',
                 boxLabel: 'Author Feedback email sent',
                     name: 'sport',
                        //checked: true,
                         x:01,
		            	y:40,
                inputValue: 'Author Feedback email sent'
                },
			{   
				 xtype: 'checkbox',
                   boxLabel: 'Final Invokes Submitted',
                   name: 'sport',
                   //checked: true,
                    x:01,
		            y:70,
                  inputValue: 'Final Invokes Submitted'
             },
             {			
			fieldLabel: 'OS $ inv.#',
			name: 'reviewername',
			align:'center',
			x:01,
			y:100,		
			allowBlank: false,
			
			},
			  {			
			fieldLabel: 'Sterling inv.#',
			name: 'reviewername',
			align:'center',
			x:01,
			y:1530,		
			allowBlank: false,
			
			}
			
	
    		]
	
	this.callParent();
}
});