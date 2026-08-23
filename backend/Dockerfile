# Multi-Stage Dockerfile for Spring Boot Backend
FROM maven:3.9.8-eclipse-temurin-17-alpine AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
RUN addgroup -S agrinexus && adduser -S agrinexus -G agrinexus
USER agrinexus:agrinexus

COPY --from=builder /app/target/agri-nexus-backend-1.0.0.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "app.jar"]
