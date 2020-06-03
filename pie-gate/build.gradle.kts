import com.google.protobuf.gradle.generateProtoTasks
import com.google.protobuf.gradle.id
import com.google.protobuf.gradle.ofSourceSet
import com.google.protobuf.gradle.plugins
import com.google.protobuf.gradle.protobuf
import com.google.protobuf.gradle.protoc
import org.gradle.api.JavaVersion.VERSION_11

val kotlinVersion = "1.3.72"

val protobufVersion: String by project
val grpcVersion: String by project
val grpcKtVersion: String by project

tasks.wrapper {
	gradleVersion = "6.3"
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

configure<JavaApplication> {
	mainClassName = "io.ktor.server.netty.EngineMain"
}

repositories {
	jcenter()
	maven(url = "https://kotlin.bintray.com/ktor")
}
dependencies {
	val coroutinesVersion: String by project
	val tomcatAnnotationsVersion: String by project
	val ktorVersion: String by project
	val log4jVersion: String by project
	val rejoinerVersion: String by project

	// kotlin
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-guava:$coroutinesVersion")

	// grpc
	compileOnly("org.apache.tomcat:annotations-api:$tomcatAnnotationsVersion")
	implementation("io.grpc:grpc-netty-shaded:$grpcVersion")
	implementation("io.grpc:grpc-protobuf:$grpcVersion")
	implementation("io.grpc:grpc-stub:$grpcVersion")
	implementation("io.grpc:grpc-kotlin-stub:$grpcKtVersion")

	implementation("com.google.guava:guava:29.0-jre")
	implementation("com.google.api.graphql:rejoiner:$rejoinerVersion")

	// ktor
	implementation("io.ktor:ktor-server-netty:$ktorVersion")
	implementation("io.ktor:ktor-server-core:$ktorVersion")
	implementation("io.ktor:ktor-auth:$ktorVersion")
	implementation("io.ktor:ktor-auth-jwt:$ktorVersion")
	implementation("io.ktor:ktor-jackson:$ktorVersion")

	implementation("org.apache.logging.log4j:log4j-api:$log4jVersion")
	implementation("org.apache.logging.log4j:log4j-core:$log4jVersion")
	implementation("org.apache.logging.log4j:log4j-slf4j-impl:$log4jVersion")

	testImplementation("io.ktor:ktor-server-tests:$ktorVersion")

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
