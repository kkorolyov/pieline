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
	gradleVersion = File("gradle-version").useLines { it.firstOrNull() }
	distributionType = Wrapper.DistributionType.ALL
}

plugins {
	kotlin("jvm") version "1.4.20"
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
	mainClassName = "io.ktor.server.netty.EngineMain"
}

repositories {
	jcenter()
	maven {
		url = uri("https://maven.pkg.github.com/kkorolyov/pieline-lib")
		credentials {
			val gprUser: String? by project
			val gprKey: String? by project

			println("${System.getenv("GITHUB_ACTOR")}-${System.getenv("GITHUB_TOKEN")}")
			println("$gprUser-$gprKey")

			username = System.getenv("GITHUB_ACTOR") ?: gprUser
			password = System.getenv("GITHUB_TOKEN") ?: gprKey
		}
	}
}
dependencies {
	val coroutinesVersion: String by project
	val tomcatAnnotationsVersion: String by project
	val ktorVersion: String by project
	val log4jVersion: String by project
	val guavaVersion: String by project
	val rejoinerVersion: String by project
	val pielineLibVersion: String by project

	implementation(platform("org.jetbrains.kotlinx:kotlinx-coroutines-bom:$coroutinesVersion"))

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
	implementation("org.jetbrains.kotlinx:kotlinx-coroutines-guava")
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

	// shared
	implementation("dev.kkorolyov.pieline:libkt:$pielineLibVersion")

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
