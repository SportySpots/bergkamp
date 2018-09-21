module.exports = {
  FLUSH_DB: `
from django.core.management import call_command
call_command('flush', interactive=False)
  `,

  CREATE_TEST_USER: `
from seedorf.users.models import User, UserProfile
test_user = User.objects.create_user(username="test@sportyspots.com", email="test@sportyspots.com", name="Test User", password="test123test")
test_user.profile = UserProfile()
test_user.save()  
  `
};
