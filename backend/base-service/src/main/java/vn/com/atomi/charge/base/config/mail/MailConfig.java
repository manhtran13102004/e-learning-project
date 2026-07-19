package vn.com.atomi.charge.base.config.mail;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
@ConditionalOnProperty(name = "atomi.mail.enabled", havingValue = "true")
public class MailConfig {

  @Value("${config.mail.host}")
  String host;

  @Value("${config.mail.port}")
  Integer port;

  @Value("${config.mail.username}")
  String username;

  @Value("${config.mail.password}")
  String password;

  @Bean
  public JavaMailSender getJavaMailSender() {
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    mailSender.setHost(host);
    mailSender.setPort(port);

    mailSender.setUsername(username);
    mailSender.setPassword(password);

    Properties props = mailSender.getJavaMailProperties();
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.ssl.enable", "true");
    props.put("mail.smtp.ssl.trust", host);

    return mailSender;
  }
}
// 2ccf4a8aa3938045ee5e83446bd6d33f