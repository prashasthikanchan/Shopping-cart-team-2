package com.example.Shoppingsql.Config;

import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestClientBuilder.HttpClientConfigCallback;
import org.elasticsearch.client.RestClientBuilder.RequestConfigCallback;
import org.apache.http.HttpHost;
import org.apache.http.client.config.RequestConfig;

import java.io.IOException;

import org.apache.http.impl.nio.client.HttpAsyncClientBuilder;

@Configuration
public class ElasticSearchConfiguration {


	    private final RestHighLevelClient elasticsearchClient;
	    
	    
	    @Bean
	    public RestHighLevelClient getElasticsearchClient() {
	        return elasticsearchClient;
	    }

	    public ElasticSearchConfiguration() {
	        RestClientBuilder builder = RestClient.builder(
	            new HttpHost("localhost", 9200, "http")
	        );

	        builder.setHttpClientConfigCallback(new HttpClientConfigCallback() {
	            @Override
	            public HttpAsyncClientBuilder customizeHttpClient(HttpAsyncClientBuilder httpClientBuilder) {
	                return httpClientBuilder;
	            }
	        });

	        builder.setRequestConfigCallback(new RequestConfigCallback() {
	            @Override
	            public RequestConfig.Builder customizeRequestConfig(RequestConfig.Builder requestConfigBuilder) {
	                return requestConfigBuilder;
	            }
	        });

	        elasticsearchClient = new RestHighLevelClient(builder);
	    }

	    public void close() throws IOException {
	        elasticsearchClient.close();
	    }
	}

