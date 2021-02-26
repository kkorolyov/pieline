import com.google.protobuf.gradle.generateProtoTasks
import com.google.protobuf.gradle.id
import com.google.protobuf.gradle.ofSourceSet
import com.google.protobuf.gradle.plugins
import com.google.protobuf.gradle.protobuf
import com.google.protobuf.gradle.protoc
import org.gradle.api.JavaVersion.VERSION_14

val grpcVersion: String by project

tasks.wrapper {
	distributionType = Wrapper.DistributionType.ALL
}

plugins {
	kotlin("jvm") version "1.4.20"
	groovy
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
			username = System.getenv("GITHUB_ACTOR") ?: property("gpr.user") as String
			password = System.getenv("GITHUB_TOKEN") ?: property("gpr.key") as String
		}
	}
}
dependencies {
	// stdlib
	val coroutinesVersion: String by project
	val pielineLibVersion: String by project

	implementation(platform("org.jetbrains.kotlinx:kotlinx-coroutines-bom:$coroutinesVersion"))
	implementation("dev.kkorolyov.pieline:libkt:$pielineLibVersion")

	// persistence
	val h2Version: String by project
	val exposedVersion: String by project

	listOf(
		"core",
		"jdbc"
	).forEach {
		implementation(("org.jetbrains.exposed:exposed-$it:$exposedVersion"))
	}
	implementation("com.h2database:h2:$h2Version")

	// grpc
	implementation(platform("io.grpc:grpc-bom:$grpcVersion"))
	listOf(
		"grpc-netty-shaded",
		"grpc-protobuf"
	).forEach {
		implementation("io.grpc:$it")
	}
	implementation("io.grpc:grpc-kotlin-stub:$grpcVersion")

	// observability
	val log4jVersion: String by project
	val jacksonVersion: String by project

	implementation(platform("org.apache.logging.log4j:log4j-bom:$log4jVersion"))
	listOf(
		"log4j-api",
		"log4j-core",
		"log4j-slf4j-impl"
	).forEach {
		implementation("org.apache.logging.log4j:$it")
	}
	implementation("com.fasterxml.jackson.dataformat:jackson-dataformat-yaml:$jacksonVersion")

	val opentracingVersion: String by project
	val opentracingGrpcVersion: String by project
	val jaegerVersion: String by project

	implementation("io.opentracing:opentracing-api:$opentracingVersion")
	implementation("io.opentracing.contrib:opentracing-grpc:$opentracingGrpcVersion")
	implementation("io.jaegertracing:jaeger-client:$jaegerVersion")

	// test
	val spockVersion: String by project
	testImplementation("org.spockframework:spock-core:$spockVersion")

	dependencyLocking {
		lockAllConfigurations()
	}
}

tasks.test {
	useJUnitPlatform()
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
	mainClass.set("dev.kkorolyov.pieproj.ServerKt")
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
			artifact = "io.grpc:protoc-gen-grpc-kotlin:$grpcVersion:jdk7@jar"
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
