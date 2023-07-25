package com;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.entity.Login;
import com.repository.LoginRepository;

public class SpringBootBackendApplicationTests {

	@Mock
	private LoginRepository loginRepository;

	@InjectMocks
	private SpringBootBackendApplication application;

	@Test
	public void adminAccountCreate() {
		Login login = new Login();
		login.setEmailid("admin@gmail.com");
		login.setPassword("admin@123");
		login.setTypeofuser("admin");

		when(loginRepository.save(login)).thenReturn(login);

		application.adminAccountCreate();

		verify(loginRepository).save(login);
	}
}
