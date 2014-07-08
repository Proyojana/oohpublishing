Ext.define('MyDesktop.store.MasterNavTree', {
    	extend:'Ext.data.TreeStore',
		alias:'data.masternavtree',
		
		root: {
        	expanded: true,        	
        	children: [
        	/*{
        		id:'mastermanagement', text: "Dashboard",iconCls:'dashboard_icon', leaf: true 
			},*/
				{ id:'customers', text: "Customers",iconCls:'customersClass', leaf: true },
				
				   { id:'service', text: "Services",iconCls:'servicesClass', leaf: true },
				   
				{ id:'vendors', text: "Vendors",iconCls:'customer', leaf: true },
				
				 {
                    text: "Workflow",
                    expanded: true,
                    children: [
                    { id:'production', text: "Activity",iconCls:'stagesClass', leaf: true },
                   
                      { id:'workflow', text: "Workflows",iconCls:'workflowClass',leaf: true },
                                     
                    ]
                  },
				   
			   { id:'troles', text: "Roles",iconCls:'rolesClass', leaf: true },
			   
        		{ id:'users', text: "Users",iconCls:'users', leaf: true },
        		
        		/*{ id:'teams', text: "Teams",iconCls:'group_clients', leaf: true },*/
        		
        	 /*  */
        	
		/*	{
        		//text:"Masters",
				//expanded: false,
				children: [
        		{ id:'', text: "Team Roles",iconCls:'', leaf: true },
        		{ id:'', text: "Users",iconCls:'', leaf: true },
        		{ id:'', text: "Teams",iconCls:'', leaf: true },
        		{ id:'', text: "Vendors",iconCls:'', leaf: true },
        		{ id:'', text: "Production Stages",iconCls:'', leaf: true },
        		
				]
			},
			{
        		id:'', text: "Reports",iconCls:'smallReports', leaf: true 
			},*/
			
			]
    		}
			
		});
	