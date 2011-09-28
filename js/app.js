Ext.regApplication({

	name: 'PAA'
		
	,launch: function() {
	
		Ext.regModel('FeedArticle', {
		
			fields: [
				'title'
				,'link'
				,'description'
				,'author'
				,{name: 'pubDate', type: 'date'}
			]
			
			,proxy: {
				type: 'ajax'
				,url: 'http://groups.google.com/group/android-alliance-philadelphia/feed/rss_v2_0_topics.xml'
				,reader: {
					type: 'xml'
					,root: 'channel'
					,record: 'item'
				}
			}
			
		});

		PAA.viewport = new Ext.Panel({
		
			fullscreen: true // signals sencha to render component immediately and fill the screen with it
			,layout: {
				type: 'vbox'
				,align: 'stretch'
			}
			
			,dockedItems: [{
				xtype: 'toolbar'
				,dock: 'top'
				,title: 'Android Alliance'
			}]
			
			,items: [{
				xtype: 'list'
				,height: 250
				,store: new Ext.data.Store({
					model: 'FeedArticle'
					,autoLoad: true
				})
				,itemTpl: [
					'<h1>{title}</h1>'
				]
				,listeners: {
					itemtap: function(list, index, item, ev) {
			    		var record = list.store.getAt(index);
			    		PAA.viewport.getComponent('articleViewer').update(record.get('description'));
					}
				}
			},{
				xtype: 'component'
				,itemId: 'articleViewer'
				,flex: 1
				,styleHtmlContent: true
				,scroll: 'vertical'
				,html: 'Select an article above'
			}]
		});

	}
	
});