FROM eclipse-temurin:17.0.17_10-jre-ubi9-minimal
ENV TZ='Asia/Ho_Chi_Minh'
WORKDIR /app
COPY target/user-service-1.0.0.jar ./user.jar
CMD ["java", "-jar", "-Dspring.profiles.active=dev", "/app/user.jar"]
