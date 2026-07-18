FROM eclipse-temurin:17.0.17_10-jre-ubi9-minimal
ENV TZ='Asia/Ho_Chi_Minh'
WORKDIR /app
COPY target/service1-1.0.0.jar ./service1.jar
CMD ["java", "-jar", "/app/service1.jar"]
