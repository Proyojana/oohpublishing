Ext.define('MyDesktop.store.MasterNavTreeUser', {
    	extend:'Ext.data.TreeStore',
		alias:'data.masternavtreeuser',
		
		root: {
        	expanded: true,        	
        	children: [
        	/*{
        		id:'mastermanagement', text: "Dashboard",iconCls:'dashboard_icon', leaf: true 
			},*/
				{ id:'customers', text: "Customers",iconCls:'customersClass', leaf: true },
				
				   { id:'service', text: "Services",iconCls:'services', leaf: true },
				   
				{ id:'vendors', text: "Vendors",iconCls:'customer', leaf: true },
				
				 {
                    text: "Workflows",
                    expanded: true,
                    children: [
                    { id:'production', text: "Activities",iconCls:'stagesClass', leaf: true },
                   
                      { id:'workflow', text: "Workflows",iconCls:'workflowClass',leaf: true },
                                     
                    ]
                  },
          { id:'template', text: "Email Templates",iconCls:'gmailClass', leaf: true },
        	{ id:'currencyrate', text: "Currency Rate",iconCls:'', leaf: true },	
        		
			
			]
    		}
			
		});
	