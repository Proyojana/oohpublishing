var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
Ext.define('MyDesktop.view.projectmanagement.newproject.budget.newprojectBudgetAddForm' ,{
    extend: 'Ext.form.Panel',
    alias : 'widget.newprojectBudgetAddForm',
   		id:'newprojectBudgetAddForm',
    margin: '2 10 10 10',
	layout: {
              type: 'absolute'
            },
	frame:true,
	height:245,
	//requires:['MyDesktop.store.State'],
    title:'Add/Edit Budget',
    defaults: {
        labelWidth: 140,
    },
    defaultType: 'textfield',
	initComponent:function(){
	/*	var ci = Ext.create('MyDesktop.store.State');
		ci.load({params:{action: 7}});
	    ci.loadPage(1);*/
		this.items= [
			{
			id:'Job #',
			name: 'usersid',
			fieldLabel: 'Job #',
			width:320,
			x:10,
			y:10,
			},
			
		{
			xtype:'combo',
			id:'activity',
			fieldLabel: 'Activity',
			x:10,
			y:40,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
    	},{
    		xtype:'combo',
			id:'level',
			fieldLabel: 'Level',
			x:10,
			y:70,
			width:320,
			allowBlank: false,
			afterLabelTextTpl: required,
			},
    	
		{  
			id:'pagerate',
			fieldLabel: '$ Page rate',
			align:'center',
			x:10,
			y:100,
			width:320,
    	},
    		{  
			id:'europagerate',
			fieldLabel: '£ page rate',
			align:'center',
			x:10,
			y:130,
			width:320,
    	},
    	
    		
    		{
        // Fieldset in Column 1 - collapsible via toggle button
        xtype:'fieldset',
        title: 'Project archiving: OOH management only',
        collapsible: true,
        defaultType: 'textfield',
        width:350,
        x:350,
        y:10,
        items :[{   
				xtype: 'checkbox',
                 boxLabel: 'Author Feedback email sent',
                     name: 'sport',
                        
                inputValue: 'Author Feedback email sent'
                },
			{   
				 xtype: 'checkbox',
                   boxLabel: 'Final Invoices Submitted',
                   name: 'sport',
                   
                  inputValue: 'Final Invoices Submitted'
             },
             {			
			fieldLabel: 'OS $ inv.#',
			name: 'reviewername',
			width:320,	
			
			},
			  {			
			fieldLabel: 'Sterling inv.#',
			name: 'reviewername',
			width:320,	
			
			}]
    },
    	{
        // Fieldset in Column 1 - collapsible via toggle button
        xtype:'fieldset',
        title: 'Cambridge Purchase Order numbers',
        collapsible: true,
        defaultType: 'textfield',
        width:345,
        x:710,
        y:10,
        items :[{			
			fieldLabel: 'USD PO',				
			width:320,	
			
			},
			{			
			fieldLabel: 'GBP PO',		
			width:320,				
			},
			]
    },
    
		{
			xtype:'button',
    	    text:'Add',
    	    iconCls: 'button_add',
    	    id:'add_users',
			x:350,
			y:200,
			width:75,
			handler: function (){				
				var currentForm = this.up('cityform');
				var city_code = Ext.getCmp('citycode').getValue();
				var city_name = Ext.getCmp('cityname').getValue();
				var city_state= Ext.getCmp('cstateid').getValue();
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/City.php',
						method: 'POST',
						params : {action:5,city_code:city_code,city_name:city_name,city_state:city_state},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('citygrid').getStore().reload();
							Ext.getCmp('citytab').layout.setActiveItem('citygrid');
										
						}
					});
				}
				else
				{
				Ext.MessageBox.alert('Please fill the required data.');
				
				}
			}
	  	},
		
		{
			xtype: 'button',
		  	text: 'Edit',
		  	iconCls: 'editClass',
		  	id:'edit_users',
			align:'center',
			x:450,
			y:200,
			width:75,
			handler: function ()
			   {
			   	var currentForm = this.up('cityform');
				var city_code = Ext.getCmp('citycode').getValue();
				var city_id = Ext.getCmp('cityid').getValue();
				var city_name = Ext.getCmp('cityname').getValue();
				var city_state= Ext.getCmp('cstateid').getValue();
				if(currentForm.getForm().isValid() == true)
				{
				var conn = new Ext.data.Connection();
					conn.request({
						url: 'service/City.php',
						method: 'POST',
						params : {action:4,city_id:city_id,city_code:city_code,city_name:city_name,city_state:city_state},
						success:function(response){
							obj = Ext.JSON.decode(response.responseText);
							Ext.Msg.alert('Message', obj.message); 
							currentForm.getForm().reset();
							Ext.getCmp('citygrid').getStore().reload();
							Ext.getCmp('citytab').layout.setActiveItem('citygrid');
										
						}
					});
				}
				else
				{
				Ext.MessageBox.alert('Please fill the required data.');
				
				}
			}
	  	},
		
	  	{
			xtype: 'button',
		  	text: 'Reset',
		  	iconCls: 'button_reset',
		  	id:'reset_users',
			x:550,
			y:200,
			width:75,
			handler: function (){
				var currentForm = this.up('cityform');
				currentForm.getForm().reset();
				Ext.getCmp('citycode').setReadOnly(false);
			}
	  	} ]
	  
	
		
	this.callParent();
	}
     
}); 


