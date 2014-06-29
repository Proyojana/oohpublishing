Ext.define('MyDesktop.store.BudgetNavTree', {
    	extend:'Ext.data.TreeStore',
		alias:'data.budgetnavtree',
		
		root: {
        	expanded: true,        	
        	children: [
        	{id:'budgetdashboard', text: "Dashboard",iconCls:'dashboard_icon', leaf: true},
			{ id:'project', text: "Project-wise Budgets",iconCls:'project_budget', leaf: true },
        	{ id:'budget', text: "Budget vs. Actual",iconCls:'line_chart', leaf: true },       		
	
			/*{id:'report', text: "Reports",iconCls:'smallReports', leaf: true 
			},*/
			
			]
    		}
			
		});
	