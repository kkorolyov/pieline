package dev.kkorolyov.pieauth.auth

import spock.lang.Specification

class PassMasterSpec extends Specification {
	PassMaster passMaster = PassMaster.INSTANCE
	String pass = "myPass"

	def "accepts matching pass"() {
		expect:
		passMaster.verify(passMaster.hash(pass.toCharArray()), pass as char[])
	}
	def "rejects different pass"() {
		expect:
		!passMaster.verify(passMaster.hash("otherPass".toCharArray()), pass as char[])
	}
}
