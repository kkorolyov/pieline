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
	gradleVersion = "6.5.1"
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
	mainClassName = "dev.kkorolyov.pieauth.ServerKt"
}

repositories {
	jcenter()
}
dependencies {
	val tomcatAnnotationsVersion: String by project

	implementation(kotlin("stdlib-jdk8"))

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
