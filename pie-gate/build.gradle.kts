import com.google.protobuf.gradle.generateProtoTasks
import com.google.protobuf.gradle.id
import com.google.protobuf.gradle.ofSourceSet
import com.google.protobuf.gradle.plugins
import com.google.protobuf.gradle.protobuf
import com.google.protobuf.gradle.protoc
import org.gradle.api.JavaVersion.VERSION_11

val grpcVersion: String by project
val grpcKtVersion: String by project

tasks.wrapper {
	gradleVersion = File("gradle-version").useLines { it.firstOrNull() }
	distributionType = Wrapper.DistributionType.ALL
}

plugins {
	kotlin("jvm") version "1.3.72"
	application
	id("com.google.protobuf") version "0.8.12"
	idea
}
group = "dev.kkorolyov"
version = "0.1"

java {
	sourceCompatibility = VERSION_11
	targetCompatibility = VERSION_11
}

application {
	mainClassName = "io.ktor.server.netty.EngineMain"
}

repositories {
	jcenter()
}
dependencies {
	val coroutinesVersion: String by project
	val tomcatAnnotationsVersion: String by project
	val ktorVersion: String by project
	val log4jVersion: String by project
	val guavaVersion: String by project
	val rejoinerVersion: String by project
	val opentracingVersion: String by project
	val opentracingGrpcVersion: String by project
	val jaegerVersion: String by project

	// grpc
	compileOnly("org.apache.tomcat:annotations-api:$tomcatAnnotationsVersion")

	implementation(platform("io.grpc:grpc-bom:$grpcVersion"))
	listOf(
		"grpc-netty-shaded",
		"grpc-protobuf",
		"grpc-stub"
	).forEach {
		implementation("io.grpc:$it")
	}
	implementation("io.grpc:grpc-kotlin-stub:$grpcKtVersion")

	implementation("com.google.guava:guava:$guavaVersion")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-guava:$coroutinesVersion")
	implementation("com.google.api.graphql:rejoiner:$rejoinerVersion")

	// ktor
	implementation(platform("io.ktor:ktor-bom:$ktorVersion"))
	listOf(
		"ktor-server-netty",
		"ktor-server-core",
		"ktor-auth",
		"ktor-auth-jwt",
		"ktor-jackson"
	).forEach {
		implementation(("io.ktor:$it"))
	}

	implementation(platform("org.apache.logging.log4j:log4j-bom:$log4jVersion"))
	listOf(
		"log4j-api",
		"log4j-core",
		"log4j-slf4j-impl"
	).forEach {
		implementation("org.apache.logging.log4j:$it")
	}

	// tracing
	implementation("io.opentracing:opentracing-api:$opentracingVersion")
	implementation("io.opentracing.contrib:opentracing-grpc:$opentracingGrpcVersion")
	implementation("io.jaegertracing:jaeger-client:$jaegerVersion")

	testImplementation("io.ktor:ktor-server-tests")

	dependencyLocking {
		lockAllConfigurations()
	}
}

sourceSets {
	main {
		proto {
			srcDir("../protos")
		}
	}
}

protobuf {
	protoc {
		val protobufVersion: String by project

		artifact = "com.google.protobuf:protoc:$protobufVersion"
	}
	plugins {
		id("grpc") {
			artifact = "io.grpc:protoc-gen-grpc-java:$grpcVersion"
		}
		id("grpckt") {
			artifact = "io.grpc:protoc-gen-grpc-kotlin:$grpcKtVersion"
		}
	}
	generateProtoTasks {
		ofSourceSet("main").forEach {
			it.plugins {
				id("grpc")
				id("grpckt")
			}
		}
	}
}
