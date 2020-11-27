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
	gradleVersion = "6.5.1"
	distributionType = Wrapper.DistributionType.ALL
}

plugins {
	kotlin("jvm") version "1.4.20"
	groovy
	application
	id("com.google.protobuf") version "0.8.13"
	idea
}
group = "dev.kkorolyov"
version = "0.1"

java {
	sourceCompatibility = VERSION_14
	targetCompatibility = VERSION_14
}

application {
	mainClassName = "dev.kkorolyov.pieauth.ServerKt"
}

repositories {
	jcenter()
	maven {
		url = uri("https://maven.pkg.github.com/kkorolyov/pieline-lib")
		credentials {
			val gprUser: String by project
			val gprKey: String by project

			username = System.getenv("GITHUB_ACTOR") ?: gprUser
			password = System.getenv("GITHUB_TOKEN") ?: gprKey
		}
	}
}
dependencies {
	val coroutinesVersion: String by project
	val argon2Version: String by project
	val h2Version: String by project
	val tomcatAnnotationsVersion: String by project
	val exposedVersion: String by project
	val log4jVersion: String by project
	val jwtVersion: String by project
	val pielineLibVersion: String by project
	val spockVersion: String by project

	implementation(platform("org.jetbrains.kotlinx:kotlinx-coroutines-bom:$coroutinesVersion"))

	implementation("de.mkammerer:argon2-jvm:$argon2Version")
	implementation("com.h2database:h2:$h2Version")
	implementation("com.auth0:java-jwt:$jwtVersion")

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
	compileOnly("org.apache.tomcat:annotations-api:$tomcatAnnotationsVersion")

	// exposed
	listOf(
		"core",
		"jdbc"
	).forEach {
		implementation(("org.jetbrains.exposed:exposed-$it:$exposedVersion"))
	}

	// logging
	implementation(platform("org.apache.logging.log4j:log4j-bom:$log4jVersion"))
	listOf(
		"log4j-api",
		"log4j-core",
		"log4j-slf4j-impl"
	).forEach {
		implementation("org.apache.logging.log4j:$it")
	}

	// shared
	implementation("dev.kkorolyov.pieline:libkt:$pielineLibVersion")

	// test
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
