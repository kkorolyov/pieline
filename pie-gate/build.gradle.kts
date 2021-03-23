import com.google.protobuf.gradle.generateProtoTasks
import com.google.protobuf.gradle.id
import com.google.protobuf.gradle.ofSourceSet
import com.google.protobuf.gradle.plugins
import com.google.protobuf.gradle.protobuf
import com.google.protobuf.gradle.protoc
import org.gradle.api.JavaVersion.VERSION_14

val grpcVersion: String by project
val grpcKtVersion: String by project

tasks.wrapper {
	distributionType = Wrapper.DistributionType.ALL
}

plugins {
	kotlin("jvm") version "1.4.32"
	application
	id("com.google.protobuf") version "0.8.15"
	idea
}
group = "dev.kkorolyov"

repositories {
	jcenter()
	maven {
		url = uri("https://maven.pkg.github.com/kkorolyov/pieline-lib")
		credentials {
			username = findProperty("gpr.user") as String? ?: System.getenv("GITHUB_ACTOR")
			password = findProperty("gpr.key") as String? ?: System.getenv("GITHUB_TOKEN")
		}
	}
}
dependencies {
	// stdlib
	val coroutinesVersion: String by project
	val pieVersion: String by project
	val tomcatAnnotationsVersion: String by project

	implementation(platform("org.jetbrains.kotlinx:kotlinx-coroutines-bom:$coroutinesVersion"))
	implementation("dev.kkorolyov.pieline:libkt:$pieVersion")
	compileOnly("org.apache.tomcat:annotations-api:$tomcatAnnotationsVersion")

	// grpc
	implementation(platform("io.grpc:grpc-bom:$grpcVersion"))
	listOf(
		"grpc-netty-shaded",
		"grpc-protobuf",
		"grpc-stub"
	).forEach {
		implementation("io.grpc:$it")
	}
	implementation("io.grpc:grpc-kotlin-stub:$grpcKtVersion")

	// gql
	val guavaVersion: String by project
	val rejoinerVersion: String by project

	implementation("com.google.guava:guava:$guavaVersion")
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-guava")
	implementation("com.google.api.graphql:rejoiner:$rejoinerVersion")

	// observability
	val log4jVersion: String by project
	val opentracingVersion: String by project
	val opentracingGrpcVersion: String by project
	val jaegerVersion: String by project

	implementation(platform("org.apache.logging.log4j:log4j-bom:$log4jVersion"))
	listOf(
		"log4j-api",
		"log4j-core",
		"log4j-slf4j-impl"
	).forEach {
		implementation("org.apache.logging.log4j:$it")
	}

	// ktor
	val ktorVersion: String by project

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

	implementation("io.opentracing:opentracing-api:$opentracingVersion")
	implementation("io.opentracing.contrib:opentracing-grpc:$opentracingGrpcVersion")
	implementation("io.jaegertracing:jaeger-client:$jaegerVersion")

	// test
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

java {
	sourceCompatibility = VERSION_14
	targetCompatibility = VERSION_14
}

application {
	mainClass.set("io.ktor.server.netty.EngineMain")
}

// Local dev run
tasks.named<JavaExec>("run") {
	environment = mapOf(
		"PORT" to 5000,
		"ADDR_AUTH" to "localhost:5001",
		"ADDR_USERS" to "localhost:5002",
		"ADDR_PROJECTS" to "localhost:5003",
		"ADDR_I18N" to "localhost:6000"
	)
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
			artifact = "io.grpc:protoc-gen-grpc-kotlin:$grpcKtVersion:jdk7@jar"
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
