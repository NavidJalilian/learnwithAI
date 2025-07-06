# Contributing to LearnWithAI

Thank you for your interest in contributing to LearnWithAI! This document provides guidelines and information for contributors.

## 🚀 Getting Started

1. **Fork the repository** and clone your fork
2. **Set up the development environment** following [DEVELOPMENT_SETUP.md](./docs/DEVELOPMENT_SETUP.md)
3. **Create a feature branch** from `main`
4. **Make your changes** following our coding standards
5. **Test your changes** thoroughly
6. **Submit a pull request** with a clear description

## 📋 Development Process

### Branch Naming Convention
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test improvements

### Commit Message Format
We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style changes
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

**Examples:**
```
feat(ai): add content generation with Gemini Pro
fix(auth): resolve Firebase authentication issue
docs(setup): update development setup guide
```

## 🧪 Testing

- **Unit Tests**: `npm test`
- **Type Checking**: `npm run type-check`
- **Linting**: `npm run lint`
- **Format Check**: `npm run format:check`

All tests must pass before submitting a PR.

## 📝 Code Standards

### TypeScript
- Use strict TypeScript configuration
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary
- Use meaningful variable and function names

### React/Next.js
- Use functional components with hooks
- Implement proper error boundaries
- Follow React best practices
- Use Next.js App Router patterns

### Database
- Use Prisma for all database operations
- Write proper migrations
- Include proper indexes and constraints
- Follow database naming conventions

### AI Services
- Handle API errors gracefully
- Implement proper rate limiting
- Validate AI responses with schemas
- Add fallback mechanisms

## 🎨 UI/UX Guidelines

- Follow the design system in `apps/web/tailwind.config.js`
- Ensure accessibility (WCAG 2.1 AA)
- Test on mobile devices
- Use semantic HTML elements
- Implement proper loading states

## 📚 Documentation

- Update relevant documentation for new features
- Include JSDoc comments for complex functions
- Add examples for new APIs
- Update the README if needed

## 🔒 Security

- Never commit sensitive information
- Use environment variables for secrets
- Follow security best practices
- Report security issues privately

## 🐛 Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser, Node version)
- Screenshots if applicable

## 💡 Feature Requests

For new features:
- Check existing issues first
- Provide clear use case and rationale
- Consider implementation complexity
- Discuss with maintainers before large changes

## 📞 Getting Help

- Check the [documentation](./docs/)
- Search existing [issues](https://github.com/NavidJalilian/learnwithAI/issues)
- Join our community discussions
- Contact maintainers for complex questions

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special mentions for outstanding contributions

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for helping make LearnWithAI better! 🎓✨
