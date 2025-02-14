# Readme

### Running the project in IntelliJ

- Clone the project from GitHub
- Open IntelliJ > File > Open
- Now search for the ``pom.xml`` file in your cloned project
- Open it as a project

### Web documentation of all API endpoints

Open http://localhost:5000/swagger-ui/index.html in your browser. You should now be able to see and test all endpoints.

### Changing the standard port

In case you are running another application that is already using port 8080:
- go to src > main > resources > application.properties
- change **server.port** to some other port

### Creating an executable .jar

- Go to the project directory (where ``pom.xml`` is located)
- Open a shell and run ``.\mvnw clean package``
- after that go to /target and now there should be a jar file

Running the jar:
- ``cd target``
- ``java -jar {Name of the jar file}``


